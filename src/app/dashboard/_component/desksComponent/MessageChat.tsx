'use client';
import React, { useState, useEffect } from 'react';
import { useSendMessage } from '@/hook/useSendMessages';
import { useIncomingMessages } from '@/hook/useChatMessages';
import { format } from 'date-fns';

interface MessageChatProps {
  session?: {
    sessionId?: string;
    user_id?: string;
    message?: string;
    timestamp?: string;
  };
}

const MessageChat: React.FC<MessageChatProps> = ({ session }) => {
  const [newMessage, setNewMessage] = useState('');
  const { sendMessage } = useSendMessage({ 
    sessionId: session?.sessionId ?? '', 
    adminId: 'ajibola45', 
    companyId: 'b0c2997a-9cea-454b-bcb1-f4709055713a' 
  });
  const { messages } = useIncomingMessages({ 
    sessionId: session?.sessionId ?? '', 
    adminId: 'ajibola45', 
    companyId: 'b0c2997a-9cea-454b-bcb1-f4709055713a' 
  });

  useEffect(() => {
    console.log('MESSAGECHAT MESSAGES:', messages);
    console.log('MESSAGECHAT SESSION:', session);
  }, [messages, session]);

  const handleSendMessage = () => {
    if (newMessage.trim() && session?.sessionId) {
      console.log('SENDING MESSAGE:', newMessage);
      sendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const getInitials = (userId?: string): string => {
    if (!userId) return '--';
    
    const namePart = userId.includes('@') 
      ? userId.split('@')[0] 
      : userId;
    
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
    <div className="w-full h-full grid" style={{ gridTemplateRows: '7% 86% 7%' }}>
      <div className="bg-white px-4 py-2 flex flex-row items-center gap-5">
        <div className='w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white'>
          {getInitials(session?.user_id)}
        </div>
        <div>
          <p className='text-xl'>{session?.user_id ?? '--'}</p>
          <h1>{formatDate(session?.timestamp)}</h1>
        </div>
      </div>
      <div className="bg-red-200 px-4 py-2 overflow-y-scroll">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`px-4 py-2 rounded-lg my-2 ${
                message.type === 'incoming' ? 'bg-white text-black' : 'bg-blue-500 text-white'
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs text-gray-500">{message.timestamp}</p>
            </div>
          ))
        )}
      </div>
      <div className="bg-gray-200 px-4 py-2 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && session?.sessionId) {
              handleSendMessage();
            }
          }}
          className="flex-grow px-4 py-2 rounded-l-lg bg-white focus:outline-none"
          placeholder={session ? "Type your message..." : "Select a session first"}
          disabled={!session?.sessionId}
        />
        <button
          onClick={handleSendMessage}
          disabled={!session?.sessionId}
          className={`px-4 py-2 rounded-r-lg text-white ${
            session?.sessionId 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageChat;