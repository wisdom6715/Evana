import { useState, useEffect, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';

interface WebSocketHookProps {
  url?: string;
  companyId: string;
  userId: string;
  sessionId?: string;
  isAgent?: boolean;
}

interface MessageData {
  session_id?: string;
  message: string;
  user_id: string;
  timestamp: string;
  isAgent?: boolean;
}

export const useWebSocket = ({ 
  url = 'http://localhost:5001', 
  companyId, 
  userId, 
  sessionId,
  isAgent = false 
}: WebSocketHookProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log('🔌 Initializing WebSocket Connection');
    console.log('Connection Parameters:', { url, companyId, userId, sessionId, isAgent });

    const newSocket = io(url, { 
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    newSocket.on('connect', () => {
      console.log('✅ WebSocket Connected Successfully');
      console.log('Socket ID:', newSocket.id);
      setIsConnected(true);

      // Join chat room on connection
      const joinPayload = { 
        company_id: companyId, 
        user_id: userId,
        session_id: sessionId, 
        isAgent 
      };
      console.log('📥 Joining Chat Room:', joinPayload);
      newSocket.emit('join_chat_room', joinPayload);
    });

    // Listen for messages specific to this session
    newSocket.on('new_message', (messageData: MessageData) => {
      console.log('📨 New Message Received:', messageData);
      // Only add messages for the specific session
      if (messageData.session_id === sessionId && messageData.user_id !== userId) {
        setMessages(prevMessages => [...prevMessages, messageData]);
      }
    });

    newSocket.on('disconnect', (reason) => {
      console.log('❌ WebSocket Disconnected:', reason);
      setIsConnected(false);
    });

    newSocket.on('connect_error', (err) => {
      console.error('🚨 WebSocket Connection Error:', err);
      setError(err);
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => {
      console.log('🔌 Cleaning up WebSocket Connection');
      newSocket.disconnect();
    };
  }, [url, companyId, userId, sessionId, isAgent]);

  const sendMessage = useCallback((messageData: MessageData) => {
    if (socket && isConnected) {
      console.log('📤 Sending Message:', messageData);
      socket.emit('send_message', messageData);
    } else {
      console.warn('❗ Cannot send message: Socket not connected');
    }
  }, [socket, isConnected]);

  return {
    socket,
    isConnected,
    messages,
    error,
    sendMessage
  };
};