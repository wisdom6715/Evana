'use client';
import { useState, useEffect } from 'react';
import { getAuth} from 'firebase/auth';
import { useRouter } from 'next/router';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

interface UserDetails {
  email: string;
  name: string;
  phoneNumber: string;
}

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const usePayment = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const auth = getAuth();
  const db = getFirestore(); // Initialize Firestore
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    if (user) {
      const fetchUserDetails = async () => {
        const userDoc = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          setUserDetails(userSnap.data() as UserDetails);
        }
        console.log('user detail updated');
        
      };
      fetchUserDetails();
    }
  }, [user, db]);

  const publicKey = 'pk_live_85b70a04648ec72c551f83d8a21d1d93019dfb14';
  const amount = 5000 * 100; // Amount in kobo

  const handlePaymentSuccess = async (response: any) => {
    alert('Payment was successful! Thank you for your subscription.');

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    if (user) {
      const userDoc = doc(db, "users", user.uid);
      await setDoc(userDoc, {
        id: user.uid,
        status: "paid",
        expiryDate: expiryDate.toISOString(),
      }, { merge: true });
    }

    router.push('/dashboard');
  };

  const handlePaymentClose = () => {
    alert('Payment was cancelled, please try again.');
  };

  const componentProps = {
    email: userDetails?.email || 'customer@example.com',
    amount,
    metadata: {
      name: userDetails?.name || 'John Doe',
      custom_fields: [
        {
          display_name: "Phone Number",
          variable_name: "phone_number",
          value: userDetails?.phoneNumber || '+2348123456789',
        },
      ],
    },
    publicKey,
    text: "Pay Now",
    onSuccess: handlePaymentSuccess,
    onClose: handlePaymentClose,
  };

  const loadPaystack = () => {
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
  };
};

export default usePayment;