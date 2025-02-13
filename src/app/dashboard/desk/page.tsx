'use client'
import NagivationComponent from '@/_components/NagivationComponent';
import MessageItem from '../_component/desksComponent/MessageItem';
import MessageChat from '../_component/desksComponent/MessageChat';
import React, {useState, useEffect} from 'react';
import { auth } from '@/lib/firebaseConfig';
import useCompany from '@/services/fetchComapnyData';
import { onAuthStateChanged } from 'firebase/auth';
import AgentPop from '@/app/dashboard/desk/component/AgentPop'
import useCheckAuth from '../useCheck'
import useDeviceCheck from '@/app/useDevice';
import Image from 'next/image';
import Logo from '@/app/assets/images/newLogo.png'

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

const CustomerServicePage: React.FC = () => {
  const [activeStatus, setActiveStatus] = useState<'open' | 'ongoing'>('open');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [basicQuery, setBasicQuery] = useState<Query | null>(null);
   const { loading} = useCheckAuth()
   const isMobile = useDeviceCheck();

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
    console.log('Session selected')
  };

  const handleBasicQueryChange = (query: Query) => {
    setBasicQuery(query);
  };

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

  if (isMobile) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg flex flex-col items-center gap-5 shadow-lg text-center">
          <Image src={Logo} alt='Intuitionlabs logo' className='md:w-80 md:h-20 w-36 h-12'/>
          <div>
            <h2 className="text-xl font-bold text-red-500">
              🚫 Mobile Not Supported
            </h2>
            <p className="text-gray-700 mt-2">
              Please use a <strong>laptop</strong> or <strong>desktop</strong> for the best experience.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen border border-l-zinc-200 overflow-y-hidden grid grid-cols-[12%_88%] bg-[#FFFDFC]">
      <div className="bg-[#FFFDFC] border border-l-zinc-200 grid grid-rows-[90%_10%] px-4">
        <NagivationComponent />
      </div>
      {
        loading &&(
          <div className="w-full h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )
      }
      
      <div className="w-full h-[95vh] flex items-center justify-center"> 
        <div className="w-[90%] h-[97%] grid grid-rows-[7%_92%] gap-[0.8%]">
          <div className="bg-white flex flex-col gap-0.5">
            <div className="flex flex-row gap-2 h-8">
              <button 
                onClick={() => setActiveStatus('open')}
                className={`px-3 rounded transition-colors
                  ${activeStatus === 'open' 
                    ? 'text-blue-500 bg-blue-50' 
                    : 'text-black hover:bg-gray-100'}`}
              >
                Open
              </button>
              <button 
                onClick={() => setActiveStatus('ongoing')}
                className={`px-3 rounded transition-colors
                  ${activeStatus === 'ongoing' 
                    ? 'text-blue-500 bg-blue-50' 
                    : 'text-black hover:bg-gray-100'}`}
              >
                Ongoing
              </button>
            </div>
            <div className="bg-[#F9F9F9] h-8 text-black border border-[#E3E3E3] pl-2 flex items-center">
              <p>Customers</p>
            </div>
          </div>
          <AgentPop />
          <div className="grid grid-cols-[40%_59%] gap-[1%] bg-white h-[90vh]">
            <div className="bg-white border border-[#DFDFDF] overflow-y-scroll h-[100%]">
              <MessageItem 
                onSessionSelect={handleSessionSelect}
                onSelectQuery={handleBasicQueryChange}
              />
            </div>
            <div className="bg-white border border-[#DFDFDF] h-[100%]">
              <MessageChat 
                companyId={company?.company_id || ''}
                adminId={localStorage.getItem('agentName') || ''}
                session={selectedSession || undefined} 
                query={basicQuery || undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerServicePage;