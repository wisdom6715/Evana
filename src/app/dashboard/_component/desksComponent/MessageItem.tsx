'use client'
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import useChatDashboard from '@/services/useBasicPlan';
import { auth } from '@/lib/firebaseConfig';
import useCompany from '@/services/fetchComapnyData';
import { onAuthStateChanged } from 'firebase/auth';

interface Session {
  id: string;
  sessionId: string;
  user_id: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'resolved' | 'active';
}

interface Query {
  messageId: string;
  message: string;
  timestamp: string;
  userId: string;
  status: 'pending' | 'answered';
}

interface MessageItemProps {
  onSessionSelect: (session: Session) => void;
  onSelectQuery: (query: Query) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ onSessionSelect, onSelectQuery }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
  const { queries } = useChatDashboard(company?.company_id);
  const pendingQueries = Object.values(queries || {}).filter(q => q.status === 'pending');

  useEffect(() => {
    const fetchSessions = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:5001/chat/sessions/${company?.company_id}`);
        const data = await response.json();
        
        const uniqueSessions = new Map<string, Session>();
  
        data.data.forEach((session: Session) => {
          const key = session.user_id;
          const currentSession = {
            ...session,
            sessionId: session.id // Ensure sessionId is set
          };
  
          const existingSession = uniqueSessions.get(key);
          if (!existingSession || 
              (currentSession.timestamp && 
               new Date(currentSession.timestamp) > new Date(existingSession.timestamp))) {
            uniqueSessions.set(key, currentSession);
          }
        });
  
        const filteredSessions = Array.from(uniqueSessions.values());
        setSessions(filteredSessions);
  
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchSessions();
  }, [company?.company_id]);
  
  const getInitials = (email: string): string => {
    if (!email) return '--';
    const [name] = email.split('@');
    return name ? name.substring(0, 2).toUpperCase() : '--';
  };
  
  const formatDate = (timestamp: string): string => {
    try {
      return format(new Date(timestamp), 'MMM dd, yyyy HH:mm');
    } catch (error) {
      return `Invalid date ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  const renderContent = () => {
    if (
      company?.userData?.planType === 'standard' ||
      company?.userData?.planType === 'enterprise'
    ) {
      return sessions && sessions.length > 0 ? (
        <ul className="space-y-2">
          {sessions.map((session, index) => (
            <li
              key={session.id ? session.id : `${session.user_id}-${index}`}
              className="flex items-center justify-between p-4 border-b last:border-none bg-gray-100 cursor-pointer"
              onClick={() => onSessionSelect(session)}
            >
              <div className="flex items-center h-5 gap-3 cursor-pointer">
                <div
                  style={{ width: '2.5rem', height: '2.5rem' }}
                  className="flex items-center justify-center bg-blue-500 text-white rounded-full mr-4"
                >
                  {getInitials(session.user_id)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {session.message && session.message.length > 10
                      ? session.message.slice(0, 70) + '.....'
                      : session.message || 'No message'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(session.timestamp)}
                  </p>
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  session.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : session.status === 'resolved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {session.status}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">
          You don't have any Notifications
        </p>
      );
    }else {
      return pendingQueries.length > 0 ? (
        <ul className="space-y-2">
          {pendingQueries.map((query) => (
            <li 
              key={query.messageId} 
              className="flex items-center justify-between p-4 border-b last:border-none bg-gray-100 cursor-pointer" 
              onClick={() => onSelectQuery({
                messageId: query.messageId,
                message: query.message!,
                timestamp: query.timestamp!,
                userId: query.userId,
                status: query.status
              })}
            >
              <div className="flex items-center h-5 gap-3 cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {query.message && query.message.length > 10
                      ? query.message.slice(0, 70) + "....."
                      : query.message || 'No message'}
                  </p>
                  <p className="text-xs text-gray-500">{formatDate(query.timestamp!)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">You don't have any Notifications</p>
      );
    }
  };

  return (
    <div className="space-y-1">
       {renderContent()}
    </div>
  );
};

export default MessageItem;