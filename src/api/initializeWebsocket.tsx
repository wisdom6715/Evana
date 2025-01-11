import { useState, useEffect, useCallback } from 'react';

interface WebSocketResponse {
  type: string;
  query_id: string;
  response?: string;
}

const useWebSocket = (
  wsUrl: string,
  currentCustomerId?: string,
  currentQueryId?: string
) => {
  const [websocket, setWebSocket] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  const initializeWebSocket = useCallback(() => {
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setConnectionStatus('Connected to support system');

      if (currentCustomerId && currentQueryId) {
        ws.send(
          JSON.stringify({
            user_id: currentCustomerId,
            user_type: 'customer',
            query_id: currentQueryId,
          })
        );
      }
    };

    ws.onmessage = (event) => {
      const parsedMessage: WebSocketResponse = JSON.parse(event.data);
      console.log('WebSocket message received:', parsedMessage);

      if (parsedMessage.type === 'response' && parsedMessage.query_id === currentQueryId) {
        setMessage(parsedMessage.response || 'No response provided');
        setConnectionStatus('Response received from agent');
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setConnectionStatus('Disconnected - attempting to reconnect...');
      setTimeout(initializeWebSocket, 5000); // Reconnect after 5 seconds
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('Connection error occurred');
    };

    setWebSocket(ws);
  }, [wsUrl, currentCustomerId, currentQueryId]);

  useEffect(() => {
    initializeWebSocket();

    return () => {
      websocket?.close();
    };
  }, [initializeWebSocket]);

  return {
    websocket,
    connectionStatus,
    message,
    initializeWebSocket,
  };
};

export default useWebSocket;
