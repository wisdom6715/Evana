// useWebSocket.ts
import { useState, useEffect, useCallback } from 'react';

interface WebSocketMessage {
  type: string;
  query_id: string;
  response?: string;
  [key: string]: any; // For any additional properties
}

interface WebSocketRequest {
  user_id: string;
  user_type: string;
  query_id: string;
  [key: string]: any; // For any additional properties
}

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
        const initialMessage: WebSocketRequest = {
          user_id: currentCustomerId,
          user_type: 'customer',
          query_id: currentQueryId,
        };
        ws.send(JSON.stringify(initialMessage));
      }
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const parsedMessage: WebSocketMessage = JSON.parse(event.data);
        console.log('WebSocket message received:', parsedMessage);

        if (parsedMessage.type === 'response' && parsedMessage.query_id === currentQueryId) {
          setMessage(parsedMessage.response || 'No response provided');
          setConnectionStatus('Response received from agent');
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
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