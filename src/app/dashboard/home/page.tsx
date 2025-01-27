'use client'
import React from 'react'
// import { useEffect, useState } from 'react'
import NagivationComponent from '@/_components/NagivationComponent'
import ChatComponent from '@/_components/ChatComponent'
import Intro from '@/_components/middle/Intro'
import Milestones from '@/_components/middle/Milestones'
import Notification from '@/_components/middle/Notification'
// import useFreeTrial from '@/services/useFreeTrial'
// import { auth } from '@/lib/firebaseConfig';
// import { onAuthStateChanged } from 'firebase/auth';
const index = () => {
  // const [user, setUser] = useState(auth.currentUser);
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });
  //   return () => unsubscribe();
  // }, []);
  // const { isTrialActive, daysLeft, endTrial } = useFreeTrial(user?.uid!);
  // const handleSubscription = () => {
  //   endTrial();
  //   // Redirect to the Paystack subscription page
  //   window.location.href = '/pricicing';
  // };
  return (
    <div className='w-[100%] h-[100vh] grid grid-cols-[12%_88%] bg-[#FFFDFC] overflow-y-hidden'>
      {/* Navigation is component */}
      <div className='bg-[#FFFDFC] border border-l-zinc-200 grid grid-rows-[90%_10%] pl-4 pr-4'>
        <NagivationComponent />
      </div>
      <div className='w-[100%] h-[100vh] grid grid-cols-[80%_20%] bg-[#fffff]'> 
        <div className='flex flex-col w-[100%] items-center'>
          <div className='grid grid-rows-[23%_40%_29%] w-[90%] h-[100%] gap-[3%]'>
            <Intro />
            <Milestones />
            <Notification />
          </div>
        </div>
        {/* Removed free trial calll */}
        {/* {isTrialActive ? (
            <div className="fixed top-1 left-0 flex justify-center right-0 transform -translate-x-1/2 z-[9999] bg-red-400">
              <h1>Welcome to Your Free Trial!</h1>
              <p>Your trial expires in {daysLeft} days.</p>
              <button onClick={handleSubscription}>Subscribe Now</button>
            </div>
          ) : (
            <div>
              <h1>Your trial has ended</h1>
              <p>Subscribe to continue enjoying premium features.</p>
              <button onClick={handleSubscription}>Subscribe Now</button>
            </div>
        )} */}
        <div className='bg-[#FFFDFC] border border-l-zinc-200'>
          <ChatComponent />

        </div>
        
      </div>
    </div>
  )
}

export default index