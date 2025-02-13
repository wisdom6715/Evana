'use client'
import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import useCompany from '@/services/fetchComapnyData';
import { onAuthStateChanged } from 'firebase/auth';

interface UserData {
  planType: string;
  status: string;
  expiryDate: {
    seconds: number;
    nanoseconds: number;
  } | string;
  billingCycle: string;
}

interface Company {
  company_name: string;
  company_email: string;
  company_contact: string;
  userData: UserData;
}

export default function UserData() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const company_Id = localStorage.getItem('companyId');
  const { company } = useCompany({
    userId: user?.uid,
    companyId: company_Id ?? ''
  });

  const formatExpiryDate = (expiryDate: UserData['expiryDate'] | undefined): string => {
    if (!expiryDate) return "N/A";

    if (typeof expiryDate === 'object' && 'seconds' in expiryDate) {
      return new Date(expiryDate.seconds * 1000).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }

    if (typeof expiryDate === "string") {
      return new Date(expiryDate).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }

    return "Invalid Date";
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-600 rounded-md">
        Please log in to view your data
      </div>
    );
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Company Profile</h2>
      <div className="space-y-2">
        <p><span className="font-medium">Company Name:</span> {company?.company_name}</p>
        <p><span className="font-medium">Email:</span> {company?.company_email}</p>
        <p><span className="font-medium">Contact:</span> {company?.company_contact}</p>
        <p><span className="font-medium">Subscription Type:</span> {company?.userData?.planType}</p>
        <p><span className="font-medium">Subscription:</span> {company?.userData?.status}</p>
        <p><span className="font-medium">Expiry Date:</span> {formatExpiryDate(company?.userData?.expiryDate)}</p>
        <p><span className="font-medium">Billing Cycle:</span> {company?.userData?.billingCycle}</p>
      </div>
    </div>
  );
}