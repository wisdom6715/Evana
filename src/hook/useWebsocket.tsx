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
  isAgent = true 
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

      const joinPayload = { 
        company_id: companyId, 
        user_id: userId,
        session_id: sessionId, 
        isAgent 
      };
      console.log('📥 Joining Chat Room:', joinPayload);
      newSocket.emit('join_chat_room', joinPayload);
    });

    // Modified message handling to prevent duplicates
    newSocket.on('new_message', (messageData: MessageData) => {
      console.log('📨 New Message Received:', messageData);
      // Only add messages from other users
      if (messageData.session_id === sessionId && messageData.user_id !== userId) {
        setMessages(prevMessages => {
          // Check if message already exists to prevent duplicates
          const messageExists = prevMessages.some(msg => 
            msg.timestamp === messageData.timestamp && 
            msg.user_id === messageData.user_id &&
            msg.message === messageData.message &&
            msg.isAgent === messageData.isAgent
          );
          if (!messageExists) {
            return [...prevMessages, messageData];
          }
          return prevMessages;
        });
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

  const sendMessage = useCallback(async (messageData: MessageData) => {
    if (socket && isConnected) {
      console.log('📤 Sending Message:', messageData);
      try {
        const response = await fetch(`http://localhost:5001/chat/${sessionId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(messageData)
        });
        
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        
        // Emit the socket message after successful HTTP request
        socket.emit('send_message', messageData);
        
        // Don't add the message to local state here since it will be handled by the component
      } catch (error) {
        console.error('Failed to send message:', error);
        throw error;
      }
    } else {
      console.warn('❗ Cannot send message: Socket not connected');
    }
  }, [socket, isConnected, sessionId]);  

  return {
    socket,
    isConnected,
    messages,
    error,
    sendMessage
  };
};