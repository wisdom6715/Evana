'use client';

import React, { useEffect } from 'react';
import bgImage from '@/app/landingPage/home/_components/images/backgroundImage.webp';
import Header from '../_components/Header';
import Intro from './_components/Intro';
import HumanSupport from './_components/HumanSupport';
import Benefit from './_components/Benefit';
import MeetAI from './_components/MeetAI';
import BotCall from './_components/BotCall';
import LastSection from './_components/LastSection';
import Footer from '../_components/Footer';
import { auth } from '@/lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import fetchUserData from '@/services/fetchUserData';

const Page = () => {
  const router = useRouter();
  const { userData, loading } = fetchUserData();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log('No user logged in');
        return;
      }

      // Wait for userData to be loaded
      if (!loading) {
        if (userData?.subscription?.status === 'active') {
          router.push('/dashboard/home');
        } else {
          router.push('/welcome');
        }
      }
    });

    return () => unsubscribe();
  }, [router, userData, loading]);

  // Show loading state while checking auth and fetching user data
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className="w-[100%] h-[100vh] relative pl-[5%] pr-[5%] md:px-[18%] py-4"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div style={{ width: '100%', height: '100vh' }}>
        <Header />
        <Intro />
      </div>
      <HumanSupport />
      <Benefit />
      <MeetAI />
      <BotCall />
      <LastSection />
      <Footer />
    </div>
  );
};

export default Page;