import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface ChatMessage {
  id?: string;  // Add unique identifier
  text: string;
  type: 'incoming' | 'outgoing';
  timestamp: string;
  sender?: string;
}

const socket: Socket = io("http://localhost:5001");

export const useIncomingMessages = ({
  sessionId = '',
  adminId = 'ajibola45',
  companyId = 'b0c2997a-9cea-454b-bcb1-f4709055713a'
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const fetchMessages = useCallback(async () => {
    if (!companyId || !sessionId) return;

    try {
      const response = await fetch(`http://localhost:5001/chat/sessions/${companyId}`);
      const data = await response.json();

      const sessionData = data.data.find((session: any) => session.session_id === sessionId);
      
      console.error('FETCH MESSAGES DEBUG:', {
        companyId,
        sessionId,
        sessionData,
        allSessions: data.data
      });

      if (sessionData?.messages) {
        const formattedMessages = sessionData.messages.map((msg: any, index: number) => ({
          id: `${sessionId}-${index}`,
          text: msg.message,
          type: msg.sender === adminId ? 'outgoing' : 'incoming',
          timestamp: msg.timestamp || new Date().toLocaleTimeString(),
          sender: msg.sender
        }));

        console.error('FORMATTED MESSAGES:', formattedMessages);
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [companyId, sessionId, adminId]);

  useEffect(() => {
    console.error('USE EFFECT TRIGGERED:', { sessionId });
    if (sessionId) {
      fetchMessages();
    }
  }, [sessionId, fetchMessages]);

  useEffect(() => {
    const handleNewMessage = (data: any) => {
      console.error('NEW MESSAGE RECEIVED:', data);
      
      if (data.session_id === sessionId) {
        const newMessage: ChatMessage = {
          id: `new-${Date.now()}`,
          text: data.message,
          type: data.sender === adminId ? 'outgoing' : 'incoming',
          timestamp: new Date().toLocaleTimeString(),
          sender: data.sender
        };

        setMessages(prev => {
          console.error('PREVIOUS MESSAGES:', prev);
          const updated = [...prev, newMessage];
          console.error('UPDATED MESSAGES:', updated);
          return updated;
        });
      }
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [sessionId, adminId]);

  return { messages, refreshMessages: fetchMessages };
};