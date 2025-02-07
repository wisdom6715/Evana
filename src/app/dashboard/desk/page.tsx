'use client'
import React, { useState } from 'react';
import NagivationComponent from '@/_components/NagivationComponent';
import MessageItem from '../_component/desksComponent/MessageItem';
import MessageChat from '../_component/desksComponent/MessageChat';

interface Session {
  sessionId: string;
  user_id?: string;
}

const CustomerServicePage: React.FC = () => {
  const [activeStatus, setActiveStatus] = useState<'open' | 'ongoing'>('open');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
  };

  return (
    <div className="w-full h-screen border border-l-zinc-200 overflow-y-hidden grid grid-cols-[12%_88%] bg-[#FFFDFC]">
      <div className="bg-[#FFFDFC] border border-l-zinc-200 grid grid-rows-[90%_10%] px-4">
        <NagivationComponent />
      </div>
      
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
          <div className="grid grid-cols-[40%_59%] gap-[1%] bg-white h-[100%]">
            <div className="bg-white border border-[#DFDFDF] overflow-y-auto">
              <MessageItem onSessionSelect={handleSessionSelect} />
            </div>
            <div className="bg-white border border-[#DFDFDF] h-[100%]">
              <MessageChat companyId='b0c2997a-9cea-454b-bcb1-f4709055713a' adminId='ajibola45' session={selectedSession || undefined} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerServicePage;