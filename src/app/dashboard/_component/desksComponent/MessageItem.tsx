// MessageItem.tsx
'use client'
import React from 'react';
import { format } from 'date-fns';
import { useCustomerService } from '@/api/useCustomerService';

interface MessageItemProps {
  activeStatus: 'open' | 'ongoing';
}

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

const MessageItem: React.FC<MessageItemProps> = ({ activeStatus }) => {
  const {
    queries,
    currentQuery,
    setCurrentQuery,
    loadQueries,
  } = useCustomerService();

  React.useEffect(() => {
    const queryStatus = activeStatus === 'open' ? 'pending' : 'resolved';
    loadQueries(queryStatus);
  }, [loadQueries, activeStatus]);

  const getInitials = (email: string): string => {
    const [name] = email.split('@');
    return name.substring(0, 2).toUpperCase();
  };

  const formatDate = (timestamp: string): string => {
    try {
      return format(new Date(timestamp), 'MMM dd, yyyy HH:mm');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const handleQueryClick = (query: Query): void => {
    setCurrentQuery(query);
  };

  return (
    <div className="space-y-1">
      {queries.map((query) => (
        <div 
          key={query.id}
          onClick={() => handleQueryClick(query)}
          className={`
            w-full h-16 flex justify-between items-center px-4 cursor-pointer 
            transition-colors duration-200 hover:bg-[#EBEBEB]
            ${query.id === currentQuery?.id ? 'bg-[#E3F2FD]' : 'bg-[#F4F4F4]'}
          `}
        >
          <div className="flex gap-2 flex-row items-center">
            <div 
              className={`
                w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl
                ${query.status === 'pending' ? 'bg-[#666666]' : 'bg-[#4CAF50]'}
              `}
            >
              <p>{getInitials(query.email)}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium">{query.email}</p>
              <p className="text-[#666666] text-sm max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
                {query.query}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="text-sm text-[#666666]">
              {formatDate(query.timestamp)}
            </p>
            <span 
              className={`
                text-xs px-2 py-1 rounded-full
                ${query.status === 'pending' 
                  ? 'bg-[#FFF3E0] text-[#F57C00]' 
                  : 'bg-[#E8F5E9] text-[#2E7D32]'}
              `}
            >
              {query.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageItem;