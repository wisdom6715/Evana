'use client'
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

interface MessageItemProps {
  onSessionSelect?: (session: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ onSessionSelect }) => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5001/chat/sessions/b0c2997a-9cea-454b-bcb1-f4709055713a`);
        const data = await response.json();
        setSessions(data.data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);
  
  const getInitials = (email: string): string => {
    const [name] = email.split('@');
    return name.substring(0, 2).toUpperCase();
  };
  
  const formatDate = (timestamp: string): string => {
    try {
      return format(new Date(timestamp), 'MMM dd, yyyy HH:mm');
    } catch (error: any) {
      return `Invalid date ${error}`;
    }
  };

  const handleSessionSelect = (session: string) => {
    onSessionSelect?.(session);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
       {sessions && sessions.length > 0 ? (
          <ul className="space-y-2">
            {sessions.map((session) => (
              <li key={session.id} className="flex items-center justify-between p-4 border-b last:border-none bg-gray-100 cursor-pointer" onClick={()=> router.replace('/dashboard/desk')}>
                <div className="flex items-center h-5 gap-3 cursor-pointer" onClick={() => handleSessionSelect(session)}>
                  <div style={{width: '2.5rem', height: '2.5rem'}} className="flex items-center justify-center bg-blue-500 text-white rounded-full mr-4">
                    {getInitials(session.user_id)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{session.message}</p>
                    <p className="text-xs text-gray-500">{formatDate(session.timestamp)}</p>
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
          <p className="text-gray-500 text-sm">You don't have any Notifications</p>
        )}
    </div>
  );
};

export default MessageItem;