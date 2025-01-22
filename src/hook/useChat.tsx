import { useState, useEffect } from 'react';
import useWebSocket from './initializeWebsocket';

interface APIResponse {
  status: 'success' | 'waiting_agent' | 'error' | 'needs_email';
  answer?: string;
  message?: string;
  notification_id?: string;
  requires_email?: boolean;
}

// Match the types from initializeWebsocket.tsx
interface CustomerRequest {
  user_id: string;
  user_type: 'customer';
  query_id: string;
  message?: string;
}

interface EmailNotification {
  email: string;
  query: string;
  company_id: string;
  customer_id: string;
}

interface UseQAFormProps {
  wsUrl: string;
}

interface UseQAFormReturn {
  handleChatting: (query: string, companyId: string) => Promise<void>;
  handleEmailSubmission: (email: string, query: string, companyId: string) => Promise<void>;
  answer: string;
  connectionStatus: string;
  isLoading: boolean;
  error: string | null;
  showEmailForm: boolean;
  currentQuery: string;
}

const useQAForm = ({ wsUrl }: UseQAFormProps): UseQAFormReturn => {
  const API_BASE_URL = 'http://localhost:5000/api';
  const [currentCustomerId, setCurrentCustomerId] = useState<string>('');
  const [currentQueryId, setCurrentQueryId] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false);
  const [currentQuery, setCurrentQuery] = useState<string>('');

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

  const handleEmailSubmission = async (email: string, query: string, companyId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const notificationData: EmailNotification = {
        email,
        query,
        company_id: companyId,
        customer_id: currentCustomerId
      };

      // Send email notification to the API
      const response = await fetch(`${API_BASE_URL}/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Send notification through WebSocket
      const wsMessage: CustomerRequest = {
        user_id: currentCustomerId,
        user_type: 'customer',
        query_id: currentQueryId || Date.now().toString(),
        message: `Email notification: ${email} - Query: ${query}`
      };
      sendMessage(wsMessage);

      setAnswer('Thank you! We\'ve received your question and will respond to your email shortly.');
      setShowEmailForm(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(`Failed to submit email: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatting = async (query: string, companyId: string): Promise<void> => {
    if (!query || !companyId) {
      setError('Query and Company ID are required');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentQuery(query);
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
          setShowEmailForm(false);
          setIsLoading(false);
          break;

        case 'waiting_agent':
          if (data.notification_id) {
            setCurrentQueryId(data.notification_id);
            setAnswer('Connecting you with a customer service representative...');
            setShowEmailForm(false);
            
            const wsMessage: CustomerRequest = {
              user_id: customerId,
              user_type: 'customer',
              query_id: data.notification_id,
              message: query
            };
            sendMessage(wsMessage);
          }
          break;

        case 'needs_email':
          setShowEmailForm(true);
          setAnswer('');
          setIsLoading(false);
          break;

        default:
          setShowEmailForm(true);
          setAnswer('We need additional information to help you better.');
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
    handleEmailSubmission,
    answer,
    connectionStatus,
    isLoading,
    error,
    showEmailForm,
    currentQuery
  };
};

export default useQAForm;