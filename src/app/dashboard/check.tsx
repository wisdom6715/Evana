"use client";
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import useCompany from '@/services/fetchComapnyData';
import { useRouter } from 'next/navigation';
import fetchUserData from '@/services/fetchUserData';

export default function useCheckAuth() {
  const router = useRouter();
  const { userData, loading } = fetchUserData();
  const [companyId, setCompanyId] = useState<string | null>(null);

  // Read 'companyId' from localStorage on the client
  useEffect(() => {
    setCompanyId(localStorage.getItem('companyId'));
  }, []);

  // Fetch data about the company
  const { company } = useCompany({ companyId: companyId ?? '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // If there's no user, redirect to login or a "welcome" page
      if (!user) {
        router.push('/auth'); // or /login
        return;
      }

      // If we have userData (and it’s done loading)...
      if (!loading) {
        // Example check #1: subscription is active
        if (userData?.subscription?.status === 'active') {
          router.push('/dashboard/home');
        }
        // Example check #2: company match
        else if (company?.company_id === companyId) {
          router.push('/dashboard/home');
        }
        // Otherwise, push user somewhere else
        else {
          router.push('/welcome');
        }
      }
    });

    return () => unsubscribe();
  }, [router, userData, loading, companyId, company]);

  // If you do want to expose any data, you could return it here:
  return {
    loading,
    userData,
    company,
  };
}