// useCustomerService.tsx
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';
const WS_URL = 'ws://localhost:8765';

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

export const useCustomerService = () => {
  const companyId = 'cfcfbfd2-d4db-4335-a89f-eaecbf762be2';
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [queries, setQueries] = useState<Query[]>([]);
  const [currentQuery, setCurrentQuery] = useState<Query | null>(null);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const loadQueries = useCallback(async (status: 'pending' | 'resolved' = 'pending'): Promise<Query[]> => {
    try {
      const response = await axios.get<ApiResponse>(
        `${API_BASE_URL}/notifications/${companyId}?status=${status}`
      );
      
      const updatedQueries = response.data.notifications;
      setQueries(updatedQueries);
      
      if (currentQuery) {
        const updatedCurrentQuery = updatedQueries.find(q => q.id === currentQuery.id);
        if (updatedCurrentQuery) {
          setCurrentQuery(updatedCurrentQuery);
        }
      }
      
      return updatedQueries;
    } catch (error) {
      console.error('Failed to load queries:', error);
      throw new Error('Failed to load queries. Please check your connection.');
    }
  }, [companyId, currentQuery]);

  const handleWebSocketMessage = useCallback((event: MessageEvent) => {
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
  }, [currentQuery, loadQueries]);

  const initializeWebSocket = useCallback(() => {
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

  const sendResponse = useCallback(async (queryId: string, responseText: string): Promise<boolean> => {
    if (!queryId || !responseText?.trim()) {
      throw new Error('Invalid query ID or response');
    }

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
      console.error('Failed to send response:', error);
      throw error;
    }
  }, [companyId, websocket, loadQueries]);

  const handleTyping = useCallback((queryId: string, isTyping = true): void => {
    if (!websocket || !queryId) return;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const message: WebSocketMessage = {
      type: 'typing',
      query_id: queryId,
      is_typing: isTyping
    };
    websocket.send(JSON.stringify(message));

    if (isTyping) {
      const timeout = setTimeout(() => {
        const stopTypingMessage: WebSocketMessage = {
          type: 'typing',
          query_id: queryId,
          is_typing: false
        };
        websocket.send(JSON.stringify(stopTypingMessage));
      }, 1000);
      
      setTypingTimeout(timeout);
    }
  }, [websocket, typingTimeout]);

  useEffect(() => {
    if (companyId) {
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
  }, [companyId, initializeWebSocket, typingTimeout]);

  return {
    isOnline,
    queries,
    currentQuery,
    setCurrentQuery,
    loadQueries,
    sendResponse,
    handleTyping
  };
};