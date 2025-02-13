'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { useWebSocket } from '@/hook/useWebsocket';
import LogoUrl from '@/app/assets/images/LatestLogo.png';
import Image from 'next/image';
import useChatDashboard from '@/services/useBasicPlan';
import { auth } from '@/lib/firebaseConfig';
import useCompany from '@/services/fetchComapnyData';
import { onAuthStateChanged } from 'firebase/auth';


interface MessageChatProps {
  session?: {
    session_id?: string;
    user_id?: string;
    message?: string;
    timestamp?: string;
  };
  query?: {
    messageId?: string;
    message?: string;
    timestamp?: string;
    userId?: string;
  };
  companyId: string;
  adminId: string;
}

const MessageChat: React.FC<MessageChatProps> = ({ 
  session, 
  companyId, 
  adminId,
  query 
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    setSelectedQuery,
    sendReply,
    sanitizeMessage,
  } = useChatDashboard(companyId);

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

  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

   const company_Id = localStorage.getItem('companyId');
  const { company } = useCompany({
    userId: user?.uid,
    companyId: company_Id!
  });

  // Handle message sending for basic plan
  const handleBasicPlanMessage = useCallback(() => {
    if (!newMessage.trim() || !query?.messageId || !query.userId) return;

    // First set the selected query
    setSelectedQuery({
      messageId: query.messageId,
      message: query.message,
      userId: query.userId,
      status: 'pending'
    });

    // Then sanitize and send the reply
    const sanitizedMessage = sanitizeMessage(newMessage);
    setTimeout(() => {
      sendReply(sanitizedMessage);
      setNewMessage('');
    }, 0);
  }, [newMessage, query, setSelectedQuery, sanitizeMessage, sendReply]);

  // Handle message sending for standard plan
  const handleStandardPlanMessage = useCallback(() => {
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

  // Fetch initial messages for standard plan
  useEffect(() => {
    const fetchChatMessages = async () => {
      if (!session?.session_id) return;

      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5001/api/messages/${companyId}/${session.session_id}`);
        const data = await response.json();
        setChatMessages(data);
        console.log('fetched chat messages', data)
      } catch (error) {
        console.error('Error fetching sessions:', error);
        if (error instanceof Response) {
          const text = await error.text();
          console.error('Server response:', text);
        }
      }finally {
        setIsLoading(false);
      }
    };
    fetchChatMessages();
  }, [session?.session_id, companyId]);

  // Handle incoming socket messages for standard plan
  useEffect(() => {
    if (socketMessages.length > 0 && company?.userData?.planType === 'standard' ||  
      socketMessages.length > 0 && company?.userData?.planType === 'enterprise') {
      const latestMessage = socketMessages[socketMessages.length - 1];
      if (latestMessage.isAgent === false) {
        setChatMessages(prev => [...prev, latestMessage]);
      }
    }
  }, [socketMessages, session?.session_id, adminId, company?.userData?.planType]);

  const getInitials = (userId?: string): string => {
    if (!userId) return '--';
    const namePart = userId.includes('@') ? userId.split('@')[0] : userId;
    return namePart.substring(0, 2).toUpperCase();
  };

  const formatDate = (timestamp?: string): string => {
    if (!timestamp) return '--';
    try {
      return format(new Date(timestamp), 'MMM dd, yyyy HH:mm');
    } catch (error) {
      return `Invalid date ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  const renderBasicPlanContent = () => (
    <>
        {
          !query && (
            <div className="bg-gray-50 h-[90%] w-full flex flex-col items-center justify-center">
              <Image src={LogoUrl} alt="logo image" />
              <p>Making Customer Experience seamless</p>
            </div>
          )
        }
      <div className="w-full h-[100%] grid bg-gray-200" style={{ gridTemplateRows: '7% 86% 7%' }}>
        <div className="bg-white px-4 py-2 flex flex-row items-center gap-5">
          <div>
            <p className="text-l">{query?.message ?? '--'}</p>
            <h1 className="text-l">{formatDate(query?.timestamp)}</h1>
          </div>
        </div>
        <div className="bg-gray-200 px-4 py-2 h-[75vh] overflow-y-scroll">
          <div className="flex flex-col gap-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-medium">Customer Query:</p>
              <p>{query?.message}</p>
            </div>
          </div>
        </div>
        <div className="bg-white px-4 py-2 flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleBasicPlanMessage();
              }
            }}
            className="flex-grow px-4 py-2 rounded-l-lg bg-white focus:outline-none"
            placeholder="Type your reply..."
            disabled={!query?.message}
          />
          <button
            onClick={handleBasicPlanMessage}
            disabled={!query?.message}
            className={`px-4 py-2 rounded-r-lg text-white ${
              query?.message ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Send Reply
          </button>
        </div>
      </div>
    </>
  );

  const renderStandardPlanContent = () => (
    <>
      {
      !session && (
        <div className="bg-gray-50 h-[90%] w-full flex flex-col items-center justify-center">
          <Image src={LogoUrl} alt="logo image" />
          <p>Making Customer Experience seamless</p>
        </div>
      )
    }
    <div className="w-full h-[100%] grid bg-gray-200" style={{ gridTemplateRows: '7% 86% 7%' }}>
      <div className="bg-white px-4 py-2 flex flex-row items-center gap-5">
        <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white">
          {getInitials(session?.user_id)}
        </div>
        <div>
          <p className="text-l">{session?.user_id ?? '--'}</p>
          <h1 className="text-l">{formatDate(session?.timestamp)}</h1>
        </div>
      </div>
      <div className="bg-gray-200 px-4 py-2 h-[75vh] overflow-y-scroll">
        {chatMessages && chatMessages.length > 0 ? (
          chatMessages.map(message => {
            const isAgent = message.isAgent;
            return (
              <div 
                key={message.companyChat_id || message.timestamp} 
                className={`my-2 flex ${isAgent ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-center ${isAgent ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full ${isAgent ? 'bg-gray-400' : 'bg-blue-400'} flex items-center justify-center text-white`}>
                    {getInitials(message.isAgent ? adminId : session?.user_id)}
                  </div>
                  <p className={`text-sm mx-2 ${isAgent ? 'bg-green-100' : 'bg-gray-100'} p-2 rounded-md`}>
                    {message.message}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No messages yet</p>
        )}
      </div>
      <div className="bg-white px-4 py-2 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && session?.session_id) {
              handleStandardPlanMessage();
            }
          }}
          className="flex-grow px-4 py-2 rounded-l-lg bg-white focus:outline-none"
          placeholder={session ? "Type your message..." : "Select a session first"}
          disabled={!session?.session_id}
        />
        <button
          onClick={handleStandardPlanMessage}
          disabled={!session?.session_id}
          className={`px-4 py-2 rounded-r-lg text-white ${
            session?.session_id ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Send
        </button>
      </div>
    </div>
    </>
  );

  if (isLoading) {
    return (
      <div className="bg-gray-50 h-full w-full">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <Image src={LogoUrl} alt="logo image" />
          <p>Making Customer Experience seamless</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {company?.userData?.planType === 'standard' ||  company?.userData?.planType === 'enterprise' ? renderStandardPlanContent() : renderBasicPlanContent()}
    </>
  );
};

export default MessageChat;