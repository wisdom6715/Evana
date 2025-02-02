'use client'
import React from 'react';
import { format } from 'date-fns';
import { useCustomerService } from '@/hook/useCustomerService';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from '@/_components/_subComponent/usePopUp'
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
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const {
    queries,
    currentQuery,
    setCurrentQuery,
    loadQueries,
    isInitialized
  } = useCustomerService();

  React.useEffect(() => {
    const queryStatus = activeStatus === 'open' ? 'pending' : 'resolved';
    loadQueries(queryStatus);
  }, [loadQueries, activeStatus]);

  // Set initial current query from URL if it exists
  React.useEffect(() => {
    const queryId = searchParams.get('queryId');
    if (queryId && queries.length > 0) {
      const query = queries.find(q => q.id === queryId);
      if (query) {
        setCurrentQuery(query);
      }
    }
  }, [queries, searchParams, setCurrentQuery]);

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
    // Create new URLSearchParams object with current params
    const params = new URLSearchParams(searchParams.toString());
    // Update or add queryId parameter
    params.set('queryId', query.id);
    // Update the URL with new search params
    router.push(`?${params.toString()}`);
    // Update the current query in state
    setCurrentQuery(query);
  };

    if(!isInitialized) {
      return (
        <div className="w-full h-full animate-bg-theme"></div>
      );
    }
  return (
    <div className="space-y-1">
      {queries.length > 0 ? queries.map((query) => (
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
      )) : (
        <div className='w-full h-8 flex justify-between items-center px-2 cursor-pointer 
              transition-colors duration-200 bg-[#F9F9F9]'>
          <h1>No {activeStatus} questions</h1>
        </div>
      )}
    </div>
  );
};

export default MessageItem;