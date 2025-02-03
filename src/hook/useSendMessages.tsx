import { useCallback, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface ChatMessage {
  id?: string;
  text: string;
  type: 'incoming' | 'outgoing';
  timestamp: string;
  sender?: string;
}

interface UseSendMessageParams {
  sessionId: string;
  adminId: string;
  companyId: string;
}

const socket: Socket = io("http://localhost:5001");

export const useSendMessage = ({
  sessionId,
  adminId,
  companyId,
}: UseSendMessageParams) => {
  const sendMessage = useCallback((messageText: string): void => {
    if (!messageText || !sessionId) return;

    const messageData = {
      session_id: sessionId,
      message: messageText,
      sender: adminId,
      company_id: companyId,
      timestamp: new Date().toISOString()
    };

    socket.emit("send_message", messageData);
  }, [sessionId, adminId, companyId]);

  return { sendMessage };
};

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

      if (sessionData?.messages) {
        const formattedMessages = sessionData.messages.map((msg: any, index: number) => ({
          id: `${sessionId}-${index}`,
          text: msg.message,
          type: msg.sender === adminId ? 'outgoing' : 'incoming',
          timestamp: msg.timestamp || new Date().toLocaleTimeString(),
          sender: msg.sender
        }));

        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [companyId, sessionId, adminId]);

  useEffect(() => {
    if (sessionId) {
      fetchMessages();
    }
  }, [sessionId, fetchMessages]);

  useEffect(() => {
    const handleNewMessage = (data: any) => {
      if (data.session_id === sessionId) {
        const newMessage: ChatMessage = {
          id: `new-${Date.now()}`,
          text: data.message,
          type: data.sender === adminId ? 'outgoing' : 'incoming',
          timestamp: data.timestamp || new Date().toLocaleTimeString(),
          sender: data.sender
        };

        setMessages(prev => {
          const isDuplicate = prev.some(msg => 
            msg.text === newMessage.text && 
            msg.timestamp === newMessage.timestamp
          );

          return isDuplicate ? prev : [...prev, newMessage];
        });
      }
    };

    socket.on("new_message", handleNewMessage);
    socket.on("send_message_ack", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("send_message_ack", handleNewMessage);
    };
  }, [sessionId, adminId]);

  return { messages, refreshMessages: fetchMessages };
};