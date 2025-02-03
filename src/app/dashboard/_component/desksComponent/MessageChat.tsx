'use client';
import React, { useState, useEffect } from 'react';
import { useSendMessage } from '@/hook/useSendMessages';
import { useIncomingMessages } from '@/hook/useChatmessages';

interface MessageChatProps {
  sessionId?: string;
}

const MessageChat: React.FC<MessageChatProps> = ({ sessionId = '' }) => {
  const [newMessage, setNewMessage] = useState('');
  const { sendMessage } = useSendMessage({ 
    sessionId, 
    adminId: 'ajibola45', 
    companyId: 'b0c2997a-9cea-454b-bcb1-f4709055713a' 
  });
  const { messages } = useIncomingMessages({ 
    sessionId, 
    adminId: 'ajibola45', 
    companyId: 'b0c2997a-9cea-454b-bcb1-f4709055713a' 
  });

  useEffect(() => {
    console.error('MESSAGECHAT MESSAGES:', messages);
    console.error('MESSAGECHAT SESSION ID:', sessionId);
  }, [messages, sessionId]);

  const handleSendMessage = () => {
    if (newMessage.trim() && sessionId) {
      console.error('SENDING MESSAGE:', newMessage);
      sendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <div className="w-full h-full grid" style={{ gridTemplateRows: '7% 86% 7%' }}>
      <div className="bg-white px-4 py-2 flex flex-row items-center gap-5">
        <div className='w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center'>
          <p className='text-xl text-white'>{sessionId ? sessionId.slice(0,2) : '--'}</p>
        </div>
        <div>
          <h1>{sessionId ? 'Active Session' : 'Select a Session'}</h1>
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
            if (e.key === 'Enter' && sessionId) {
              handleSendMessage();
            }
          }}
          className="flex-grow px-4 py-2 rounded-l-lg bg-white focus:outline-none"
          placeholder={sessionId ? "Type your message..." : "Select a session first"}
          disabled={!sessionId}
        />
        <button
          onClick={handleSendMessage}
          disabled={!sessionId}
          className={`px-4 py-2 rounded-r-lg text-white ${
            sessionId 
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