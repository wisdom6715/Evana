// MessageChat.tsx
'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useCustomerService } from '@/hook/useCustomerService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface Query {
  id: string;
  email: string;
  query: string;
  status: 'pending' | 'resolved' | 'answered';
  timestamp: string;
  response?: string;
  messages?: Message[];
}

const MessageChat: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    currentQuery,
    sendResponse,
    handleTyping
  } = useCustomerService();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentQuery]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !currentQuery) return;

    try {
      await sendResponse(currentQuery.id, inputMessage);
      setInputMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
    if (currentQuery) {
      handleTyping(currentQuery.id, true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getInitials = (email: string): string => {
    if (!email) return '--';
    const [name] = email.split('@');
    return name.substring(0, 2).toUpperCase();
  };

  const formatTime = (timestamp: string): string => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="w-full h-full grid" style={{ gridTemplateRows: '7% 86% 7%' }}>
      {/* Header */}
      <div className="flex gap-2 items-center bg-white px-2 border-b border-gray-200">
        <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white text-2xl">
          <p>{currentQuery ? getInitials(currentQuery.email) : '--'}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-medium">{currentQuery?.email || 'Select a conversation'}</p>
          <p className="text-sm text-gray-600">{currentQuery?.query || 'No query selected'}</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="bg-[#F5F4F4] overflow-y-auto p-4 space-y-4">
        {currentQuery && (
          <>
            {/* Customer's initial query */}
            <div className="flex justify-start">
              <div className="bg-white rounded-lg p-3 max-w-[70%] shadow-sm">
                <p className="text-gray-800">{currentQuery.query}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTime(currentQuery.timestamp)}
                </p>
              </div>
            </div>

            {/* Agent's response if exists */}
            {currentQuery.query && (
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[70%] shadow-sm">
                  <p>{currentQuery.query}</p>
                  <p className="text-xs text-blue-100 mt-1">
                    {formatTime(currentQuery.timestamp)}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Container */}
      <div className="flex items-center bg-white border-t border-gray-200">
        <div className="grid grid-cols-[95%_5%] items-center w-full h-full px-2">
          <input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-[95%] outline-none h-[70%] pl-3 bg-white"
            disabled={!currentQuery || currentQuery.status === 'answered'}
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || !currentQuery || currentQuery.status === 'answered'}
            className="focus:outline-none disabled:opacity-50"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              width="30" 
              height="30"
              className={`transform rotate-90 ${inputMessage.trim() ? 'fill-blue-500' : 'fill-gray-400'}`}
            >
              <path d="M12,24A12,12,0,1,0,0,12,12.013,12.013,0,0,0,12,24ZM6.293,9.465,9.879,5.879h0a3,3,0,0,1,4.243,0l3.585,3.586.024.025a1,1,0,1,1-1.438,1.389L13,7.586,13.007,18a1,1,0,0,1-2,0L11,7.587,7.707,10.879A1,1,0,1,1,6.293,9.465Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageChat;