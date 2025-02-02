import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import useCompany from '@/services/fetchComapnyData';
import { auth } from '@/lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const API_BASE_URL = 'http://localhost:5000/api';
const WS_URL = 'ws://localhost:8765';
const INITIALIZATION_DELAY = 3000; // 3 seconds delay

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface Query {
  id: string;
  email: string;
  query: string;
  status: 'pending' | 'resolved' | 'answered';
  timestamp: string;
  response?: string;
  messages?: Message[];
}

interface WebSocketMessage { 
  type: 'new_query' | 'response' | 'typing' | 'connection';
  query_id?: string;
  response?: string;
  is_typing?: boolean;
  user_type?: string;
  company_id?: string;
}

interface ApiResponse {
  status: 'success' | 'error';
  message?: string;
  notifications: Query[];
}

interface ErrorState {
  message: string;
  code?: string;
  timestamp: number;
}

interface UseCustomerServiceReturn {
  isOnline: boolean;
  queries: Query[];
  currentQuery: Query | null;
  setCurrentQuery: (query: Query | null) => void;
  loadQueries: (status?: 'pending' | 'resolved') => Promise<Query[]>;
  sendResponse: (queryId: string, responseText: string) => Promise<boolean>;
  handleTyping: (queryId: string, isTyping?: boolean) => void;
  error: ErrorState | null;
  isLoading: boolean;
  isInitialized: boolean;
  clearError: () => void;
}

export const useCustomerService = (): UseCustomerServiceReturn => {
  const [user, setUser] = useState(auth.currentUser);
  const [error, setError] = useState<ErrorState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  const company_Id = localStorage.getItem('companyId');
  const { company } = useCompany({
    userId: user?.uid,
    companyId: company_Id!
  });

  const companyId = company?.company_id;
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [queries, setQueries] = useState<Query[]>([]);
  const [currentQuery, setCurrentQuery] = useState<Query | null>(null);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // Initialize the hook once company data is available
  useEffect(() => {
    let initTimeout: NodeJS.Timeout;

    if (companyId && !isInitialized) {
      initTimeout = setTimeout(() => {
        setIsInitialized(true);
      }, INITIALIZATION_DELAY);
    }

    return () => {
      if (initTimeout) {
        clearTimeout(initTimeout);
      }
    };
  }, [companyId, isInitialized]);

  const handleError = useCallback((error: unknown, customMessage?: string) => {
    const errorState: ErrorState = {
      message: customMessage || 'An unexpected error occurred',
      timestamp: Date.now()
    };

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse>;
      
      if (axiosError.response) {
        errorState.code = String(axiosError.response.status);
        errorState.message = axiosError.response.data?.message || 
          (axiosError.response.status === 404 && !companyId 
            ? 'Company ID is not available. Please check your connection.'
            : `Server error: ${axiosError.response.status}`);
      } else if (axiosError.request) {
        errorState.code = 'NETWORK_ERROR';
        errorState.message = 'Network error. Please check your connection.';
      }
    } else if (error instanceof Error) {
      errorState.message = error.message;
    }

    setError(errorState);
    return errorState;
  }, [companyId]);

  const handleWebSocketMessage = useCallback((event: MessageEvent) => {
    try {
      const message: WebSocketMessage = JSON.parse(event.data);
      
      switch (message.type) {
        case 'new_query':
          loadQueries('pending');
          break;
        case 'response':
          if (currentQuery?.id === message.query_id) {
            setCurrentQuery(prev => prev ? {
              ...prev,
              response: message.response,
              status: 'answered'
            } : null);
          }
          loadQueries('pending');
          break;
      }
    } catch (error) {
      console.error('Error handling WebSocket message:', error);
    }
  }, [currentQuery]);

  const initializeWebSocket = useCallback(() => {
    if (!companyId) return;

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      const message: WebSocketMessage = {
        type: 'connection',
        user_type: 'agent',
        company_id: companyId
      };
      ws.send(JSON.stringify(message));
      setIsOnline(true);
    };

    ws.onmessage = handleWebSocketMessage;

    ws.onclose = () => {
      setIsOnline(false);
      setTimeout(() => {
        if (companyId) {
          initializeWebSocket();
        }
      }, 5000);
    };

    ws.onerror = () => {
      setIsOnline(false);
    };

    setWebsocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [companyId, handleWebSocketMessage]);

  const loadQueries = useCallback(async (status: 'pending' | 'resolved' = 'pending'): Promise<Query[]> => {
    if (!isInitialized) {
      return Promise.resolve([]);
    }

    if (!companyId) {
      const error = handleError(new Error('Company ID not available'), 
        'Unable to load queries: Company ID is not available');
      return Promise.reject(error);
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<ApiResponse>(
        `${API_BASE_URL}/notifications/${companyId}?status=${status}`
      );
      
      const updatedQueries = response.data.notifications;
      setQueries(updatedQueries);
      
      if (currentQuery) {
        const updatedCurrentQuery = updatedQueries.find(query => query.id === currentQuery.id);
        if (updatedCurrentQuery) {
          setCurrentQuery(updatedCurrentQuery);
        }
      }
      
      return updatedQueries;
    } catch (error) {
      const errorState = handleError(error);
      throw errorState;
    } finally {
      setIsLoading(false);
    }
  }, [companyId, currentQuery, handleError, isInitialized]);

  const sendResponse = useCallback(async (queryId: string, responseText: string): Promise<boolean> => {
    if (!isInitialized) {
      return Promise.resolve(false);
    }

    if (!companyId) {
      const error = handleError(new Error('Company ID not available'),
        'Unable to send response: Company ID is not available');
      return Promise.reject(error);
    }

    if (!queryId || !responseText?.trim()) {
      const error = handleError(new Error('Invalid query ID or response'),
        'Please provide both query ID and response text');
      return Promise.reject(error);
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await axios.put<ApiResponse>(
        `${API_BASE_URL}/notifications/${companyId}/${queryId}`,
        {
          status: 'answered',
          response: responseText,
        }
      );

      if (result.data.status === 'success') {
        if (websocket?.readyState === WebSocket.OPEN) {
          const message: WebSocketMessage = {
            type: 'response',
            query_id: queryId,
            response: responseText
          };
          websocket.send(JSON.stringify(message));
        }

        await loadQueries('pending');
        return true;
      }
      
      throw new Error(result.data.message || 'Failed to send response');
    } catch (error) {
      const errorState = handleError(error);
      throw errorState;
    } finally {
      setIsLoading(false);
    }
  }, [companyId, websocket, loadQueries, handleError, isInitialized]);

  const handleTyping = useCallback((queryId: string, isTyping = true): void => {
    if (!websocket || !queryId) {
      console.warn('WebSocket or queryId not available for typing notification');
      return;
    }

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    try {
      const message: WebSocketMessage = {
        type: 'typing',
        query_id: queryId,
        is_typing: isTyping
      };
      websocket.send(JSON.stringify(message));

      if (isTyping) {
        const timeout = setTimeout(() => {
          if (websocket.readyState === WebSocket.OPEN) {
            const stopTypingMessage: WebSocketMessage = {
              type: 'typing',
              query_id: queryId,
              is_typing: false
            };
            websocket.send(JSON.stringify(stopTypingMessage));
          }
        }, 1000);
        
        setTypingTimeout(timeout);
      }
    } catch (error) {
      console.error('Failed to send typing status:', error);
    }
  }, [websocket, typingTimeout]);

  useEffect(() => {
    if (isInitialized && companyId) {
      initializeWebSocket();
    }

    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      if (websocket) {
        websocket.close();
      }
    };
  }, [companyId, initializeWebSocket, typingTimeout, isInitialized]);

  return {
    isOnline,
    queries,
    currentQuery,
    setCurrentQuery,
    loadQueries,
    sendResponse,
    handleTyping,
    error,
    isLoading,
    isInitialized,
    clearError: () => setError(null)
  };
};