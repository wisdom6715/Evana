import React from 'react';
import { useCustomerService } from '@/hook/useCustomerService';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

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

const Notification: React.FC = () => {
  const { queries, loadQueries, isInitialized } = useCustomerService();
  const router = useRouter();

  React.useEffect(() => {
    loadQueries();
  }, [loadQueries]);

  const getInitials = (email: string): string => {
    const [name] = email.split('@');
    return name.substring(0, 2).toUpperCase();
  };

  if(!isInitialized){
    return(
      <div className="w-full h-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const formatDate = (timestamp: string): string => {
    try {
      return format(new Date(timestamp), 'MMM dd, yyyy HH:mm');
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className='h-[100%]'>
      <h1 className="text-l font-bold  text-gray-800 mb-4">Notification</h1>
      <div style={{height: '15rem', maxHeight: '15rem', overflowY: 'scroll', }}>
        {queries && queries.length > 0 ? (
          <ul className="space-y-2">
            {queries.map((query: Query) => (
              <li key={query.id} className="flex items-center justify-between p-4 border-b last:border-none bg-gray-100 cursor-pointer" onClick={()=> router.replace('/dashboard/desk')}>
                <div className="flex items-center h-5 gap-3 cursor-pointer">
                  <div style={{width: '2.5rem', height: '2.5rem'}} className="flex items-center justify-center bg-blue-500 text-white rounded-full mr-4">
                    {getInitials(query.email)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{query.query}</p>
                    <p className="text-xs text-gray-500">{formatDate(query.timestamp)}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    query.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : query.status === 'resolved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {query.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">You don't have any Notifications</p>
        )}
      </div>
    </div>
  );
};

export default Notification;