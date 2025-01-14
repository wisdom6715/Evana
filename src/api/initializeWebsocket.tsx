import { useState, useEffect, useCallback } from 'react';

// Define specific message types that can be handled
interface BaseWebSocketMessage {
  type: string;
  query_id: string;
}

interface ResponseMessage extends BaseWebSocketMessage {
  type: 'response';
  response: string;
}

interface StatusMessage extends BaseWebSocketMessage {
  type: 'status';
  status: string;
}

// Union type for all possible message types
type WebSocketMessage = ResponseMessage | StatusMessage;

// Define specific request types
interface BaseWebSocketRequest {
  user_id: string;
  user_type: string;
  query_id: string;
}

interface CustomerRequest extends BaseWebSocketRequest {
  user_type: 'customer';
  message?: string;
}

interface AgentRequest extends BaseWebSocketRequest {
  user_type: 'agent';
  action: 'accept' | 'resolve' | 'transfer';
}

type WebSocketRequest = CustomerRequest | AgentRequest;

interface UseWebSocketProps {
  wsUrl: string;
  currentCustomerId?: string;
  currentQueryId?: string;
}

interface UseWebSocketReturn {
  websocket: WebSocket | null;
  connectionStatus: string;
  message: string | null;
  sendMessage: (message: WebSocketRequest) => void;
  initializeWebSocket: () => (() => void) | undefined;
}

const useWebSocket = ({
  wsUrl,
  currentCustomerId,
  currentQueryId
}: UseWebSocketProps): UseWebSocketReturn => {
  const [websocket, setWebSocket] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  const initializeWebSocket = useCallback(() => {
    if (!wsUrl) return;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setConnectionStatus('Connected to support system');

      if (currentCustomerId && currentQueryId) {
        const initialMessage: CustomerRequest = {
          user_id: currentCustomerId,
          user_type: 'customer',
          query_id: currentQueryId,
        };
        ws.send(JSON.stringify(initialMessage));
      }
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const parsedMessage = JSON.parse(event.data) as WebSocketMessage;
        console.log('WebSocket message received:', parsedMessage);

        if (parsedMessage.type === 'response' && parsedMessage.query_id === currentQueryId) {
          setMessage(parsedMessage.response);
          setConnectionStatus('Response received from agent');
        } else if (parsedMessage.type === 'status') {
          setConnectionStatus(parsedMessage.status);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error instanceof Error ? error.message : 'Unknown error');
        setConnectionStatus('Error processing message');
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setConnectionStatus('Disconnected - attempting to reconnect...');
      // Attempt to reconnect after 5 seconds
      setTimeout(initializeWebSocket, 5000);
    };

    ws.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('Connection error occurred');
    };

    setWebSocket(ws);

    // Cleanup function
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [wsUrl, currentCustomerId, currentQueryId]);

  useEffect(() => {
    const cleanup = initializeWebSocket();
    return () => {
      cleanup?.();
    };
  }, [initializeWebSocket]);

  const sendMessage = useCallback((message: WebSocketRequest) => {
    if (websocket?.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  }, [websocket]);

  return {
    websocket,
    connectionStatus,
    message,
    sendMessage,
    initializeWebSocket
  };
};

export default useWebSocket;