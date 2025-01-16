import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '@/lib/firebaseConfig';

const auth = getAuth(app);
const db = getFirestore(app);

interface UserData {
  name?: string | null;
  email?: string | null;
  phoneNumber?: string;
  createdAt?: string;
  lastUpdated?: string;
  subscription?: {
    amount: number;
    billingCycle: string;
    expiryDate: string;
    paymentDate: string;
    planType: string;
    status: string;
  };
  paymentHistory?: {
    [key: string]: {
      amount: number;
      billingCycle: string;
      expiryDate: string;
      paymentDate: string;
      planType: string;
      status: string;
      transactionRef: string;
    };
  };
}

export default function useUserData() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (user: any) => {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!isMounted) return;

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          const formattedData: UserData = {
            ...data,
            createdAt: data.createdAt?.toDate().toISOString(),
            lastUpdated: data.lastUpdated?.toDate().toISOString(),
            subscription: data.subscription,
            paymentHistory: data.paymentHistory,
          };

          setUserData(formattedData);
          setError(null);
        } else {
          setError('No user data found');
          setUserData(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError('Error fetching user data: ' + err.message);
          setUserData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData(user);
      } else {
        if (isMounted) {
          setUserData(null);
          setError('No user logged in');
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return {
    userData,
    loading,
    error,
  };
}