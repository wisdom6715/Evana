'use client'
import React, { useState, useEffect } from 'react';
import useCompany from '@/services/fetchComapnyData';
import { auth } from '@/lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import NagivationComponent from '@/_components/NagivationComponent'
import Summary from '../_component/chatlogComponent/Summary'
// import useCheckAuth from '../useCheck'
const Index = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  // const { loading} = useCheckAuth()

  useEffect(() => {
    // Get companyId from localStorage only on client side
    setCompanyId(localStorage.getItem('companyId'));
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const { company } = useCompany({
    userId: user?.uid,
    companyId: companyId!
  });
  useEffect(() => {
    // Fetch summary when component mounts or companyId/date changes
    if (company?.company_id) {
      fetchDailySummary(company?.company_id, selectedDate);
    }
  }, [company?.company_id, selectedDate]);

  const handleFetchSummary = () => {
    if (company?.company_id) {
      fetchDailySummary(company?.company_id, selectedDate);
    }
  };

  const handleExportPDF = () => {
    if (company?.company_id) {
      exportPDF(company?.company_id, selectedDate);
    }
  };

  return (
    <div className='w-[100%] h-[100vh] grid grid-cols-[12%_88%] bg-[#FFFDFC]'>
      {/* Navigation is component */}
      <div className='bg-[#FFFDFC] border border-l-zinc-200 grid grid-rows-[90%_10%] pl-4 pr-4'>
        <NagivationComponent />
      </div>
      {/* {
        loading &&(
          <div className="w-full h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )
      } */}
      <Summary  setSelectedDate={setSelectedDate} handleExportPDF={handleExportPDF} handleFetchSummary={handleFetchSummary}/>
    </div>
  )
}

export default Index