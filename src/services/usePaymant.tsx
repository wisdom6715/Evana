'use client';
import { useState, useEffect } from 'react';
import { getAuth, User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import firebaseApp from '@/lib/firebaseConfig';
import { useRouter, useSearchParams } from 'next/navigation'

interface UserDetails {
  email: string;
  name: string;
  phoneNumber: string;
}

interface PaymentDetails {
  planType: string;
  billingCycle: string;
  amount: number;
  status: string;
  paymentDate: Timestamp;
  expiryDate: string;
}

// Define Paystack response type
interface PaystackResponse {
  reference: string;
  status: string;
  transaction: string;
  message: string;
  redirect_url?: string;
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: PaystackConfig) => { openIframe: () => void };
    };
  }
}

interface PaystackConfig {
  email: string;
  amount: number;
  metadata: {
    name: string;
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
  publicKey: string;
  text: string;
  onSuccess: (response: PaystackResponse) => void;
  onClose: () => void;
}

const usePayment = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const user: User | null = auth.currentUser;
  const router = useRouter();

  const [queryParams, setQueryParams] = useState<{ plan?: string; billing?: string; price?:number }>({});
  const searchParams = useSearchParams();

  useEffect(() => {
    const plan = searchParams.get('plan');
    const billing = searchParams.get('billing');
    const price = searchParams.get('price');
    let parsedPrice = price ? parseFloat(price) : 0;

    if (billing === 'annual') {
      parsedPrice = Math.floor(parsedPrice * 12);
    }

    setQueryParams({ 
      plan: plan || '', 
      billing: billing || '',
      price: parsedPrice,
    });
  }, [searchParams]);

  useEffect(() => {
    setIsClient(true);

    const fetchUserDetails = async () => {
      if (!user) return;
      
      try {
        const userDoc = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userDoc);
        
        if (userSnap.exists()) {
          setUserDetails(userSnap.data() as UserDetails);
        } else {
          // Create initial user document if it doesn't exist
          const initialUserData = {
            email: user.email,
            name: user.displayName,
            phoneNumber: '',
            createdAt: serverTimestamp(),
          };
          await setDoc(userDoc, initialUserData);
          setUserDetails(initialUserData as UserDetails);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user, db]);

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY!;
  const amount = queryParams.price || 0;

  const handlePaymentSuccess = async (response: PaystackResponse) => {
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error('No user authenticated');
      }

      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + (queryParams.billing === 'annual' ? 365 : 30));

      const paymentDetails: PaymentDetails = {
        planType: queryParams.plan || 'basic',
        billingCycle: queryParams.billing || 'monthly',
        amount: amount,
        status: 'active',
        paymentDate: serverTimestamp() as Timestamp,
        expiryDate: expiryDate.toISOString(),
      };

      // Update user document with payment information
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, {
        subscription: paymentDetails,
        userId: user.uid,
        lastUpdated: serverTimestamp(),
        paymentHistory: {
          [response.reference]: {
            ...paymentDetails,
            transactionRef: response.reference,
            status: 'successful',
          }
        }
      }, { merge: true });

      alert('Payment was successful! Thank you for your subscription.');
      router.push('/dashboard/settings');
    } catch (error) {
      console.error('Error updating payment information:', error);
      alert('There was an error processing your payment. Please contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentClose = () => {
    alert('Payment was cancelled, please try again.');
  };

  const componentProps: PaystackConfig = {
    email: user?.email || 'customer@example.com',
    amount: amount * 100, // Convert to kobo/cents
    metadata: {
      name: user?.displayName || 'John Doe',
      custom_fields: [
        {
          display_name: 'Phone Number',
          variable_name: user?.uid || '',
          value: userDetails?.phoneNumber || '+2348123456789',
        },
      ],
    },
    publicKey,
    text: 'Pay Now',
    onSuccess: handlePaymentSuccess,
    onClose: handlePaymentClose,
  };

  const loadPaystack = () => {
    if (!user) {
      alert('Please login to continue with payment');
      return;
    }

    if (window.PaystackPop) {
      const handler = window.PaystackPop.setup(componentProps);
      handler.openIframe();
    } else {
      alert('Paystack failed to load, please try again.');
    }
  };

  return {
    isClient,
    loadPaystack,
    componentProps,
    queryParams,
    isLoading
  };
};

export default usePayment;