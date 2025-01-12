// useQAForm.ts
import { useState, useEffect } from 'react';
import useWebSocket from './initializeWebsocket';

interface APIResponse {
  status: 'success' | 'waiting_agent' | 'error';
  answer?: string;
  message?: string;
  notification_id?: string;
}

interface WebSocketMessage {
  user_id: string;
  user_type: string;
  company_id: string;
  query_id: string;
}

interface UseQAFormProps {
  wsUrl: string;
}

interface UseQAFormReturn {
  handleChatting: (query: string, companyId: string) => Promise<void>;
  answer: string;
  connectionStatus: string;
  isLoading: boolean;
  error: string | null;
}

const useQAForm = ({ wsUrl }: UseQAFormProps): UseQAFormReturn => {
  const API_BASE_URL = 'http://localhost:5000/api';
  const [currentCustomerId, setCurrentCustomerId] = useState<string>('');
  const [currentQueryId, setCurrentQueryId] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    connectionStatus,
    message,
    sendMessage
  } = useWebSocket({
    wsUrl,
    currentCustomerId,
    currentQueryId
  });

  useEffect(() => {
    if (message) {
      setAnswer(message);
      setIsLoading(false);
    }
  }, [message]);

  const handleChatting = async (query: string, companyId: string): Promise<void> => {
    if (!query || !companyId) {
      setError('Query and Company ID are required');
      return;
    }

    setIsLoading(true);
    setError(null);
    const customerId = Date.now().toString();
    setCurrentCustomerId(customerId);

    try {
      const response = await fetch(`${API_BASE_URL}/ask/${companyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          customer_id: customerId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: APIResponse = await response.json();

      switch (data.status) {
        case 'success':
          setAnswer(data.answer || '');
          setIsLoading(false);
          break;

        case 'waiting_agent':
          if (data.notification_id) {
            setCurrentQueryId(data.notification_id);
            setAnswer('Connecting you with a customer service representative...');
            
            const wsMessage: WebSocketMessage = {
              user_id: customerId,
              user_type: 'customer',
              company_id: companyId,
              query_id: data.notification_id,
            };
            sendMessage(wsMessage);
          }
          break;

        default:
          setAnswer(data.message || 'Unknown response from server');
          setIsLoading(false);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(`Error: ${errorMessage}`);
      setAnswer('');
      setIsLoading(false);
    }
  };

  return {
    handleChatting,
    answer,
    connectionStatus,
    isLoading,
    error,
  };
};

export default useQAForm;