'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { useWebSocket } from '@/hook/useWebsocket';

interface MessageChatProps {
  session?: {
    session_id?: string;
    user_id?: string;
    message?: string;
    timestamp?: string;
  };
  companyId: string;
  adminId: string;
}

const MessageChat: React.FC<MessageChatProps> = ({ 
  session, 
  companyId, 
  adminId 
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { 
    messages: socketMessages, 
    sendMessage 
  } = useWebSocket({
    url: 'http://localhost:5001',
    companyId,
    userId: adminId,
    sessionId: session?.session_id,
    isAgent: true
  });

  // Fetch initial messages
  useEffect(() => {
    const fetchChatMessages = async () => {
      if (!session?.session_id) return;

      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5001/api/messages/${companyId}/${session.session_id}`);
        const data = await response.json();
        setChatMessages(data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChatMessages();
  }, [session?.session_id, companyId]);

  // Handle incoming socket messages
  useEffect(() => {
    if (socketMessages.length > 0) {
      const latestMessage = socketMessages[socketMessages.length - 1];
      if (latestMessage.session_id === session?.session_id) {
        setChatMessages(prev => [...prev, latestMessage]);
      }
    }
  }, [socketMessages, session?.session_id]);

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !session?.session_id) return;

    const messageData = {
      companyChat_id: crypto.randomUUID(),
      company_id: companyId,
      session_id: session.session_id,
      message: newMessage.trim(),
      user_id: adminId,
      timestamp: new Date().toISOString(),
      isAgent: true
    };

    sendMessage(messageData);
    setChatMessages(prev => [...prev, messageData]);
    setNewMessage('');
  }, [newMessage, session?.session_id, companyId, adminId, sendMessage]);

  const getInitials = (userId?: string): string => {
    if (!userId) return '--';
    const namePart = userId.includes('@') ? userId.split('@')[0] : userId;
    return namePart.substring(0, 2).toUpperCase();
  };

  const formatDate = (timestamp?: string): string => {
    if (!timestamp) return '--';
    try {
      return format(new Date(timestamp), 'MMM dd, yyyy HH:mm');
    } catch (error: any) {
      return `Invalid date ${error.message}`;
    }
  };

  return (
    <div className="w-full h-[100%] grid" style={{ gridTemplateRows: '7% 86% 7%' }}>
      <div className="bg-white px-4 py-2 flex flex-row items-center gap-5">
        <div className='w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white'>
          {getInitials(session?.user_id)}
        </div>
        <div>
          <p className='text-xl'>{session?.user_id ?? '--'}</p>
          <h1>{formatDate(session?.timestamp)}</h1>
        </div>
      </div>

      <div className="bg-red-200 px-4 py-2 h-[99%] overflow-y-scroll">
        {chatMessages && chatMessages.length > 0 ? chatMessages.map(message => {
          const isAgent = message.isAgent;
          const userId = message.user_id;
          const userInitials = getInitials(userId);

          return (
            <div 
              key={message.companyChat_id || message.timestamp} 
              className={`my-2 flex ${isAgent ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-center ${isAgent ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-7 h-7 rounded-full ${isAgent ? 'bg-gray-400' : 'bg-blue-400'} flex items-center justify-center text-white`}>
                  {userInitials}
                </div>
                <p className={`text-sm mx-2 ${isAgent ? 'bg-green-100' : 'bg-gray-100'} p-2 rounded-md`}>
                  {message.message}
                </p>
              </div>
            </div>
          );
        }) : <p>Loading messages...</p>}
      </div>
      <div className="bg-gray-200 px-4 py-2 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && session?.session_id) {
              handleSendMessage();
            }
          }}
          className="flex-grow px-4 py-2 rounded-l-lg bg-white focus:outline-none"
          placeholder={session ? "Type your message..." : "Select a session first"}
          disabled={!session?.session_id}
        />
        <button
          onClick={handleSendMessage}
          disabled={!session?.session_id}
          className={`px-4 py-2 rounded-r-lg text-white ${session?.session_id ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageChat;