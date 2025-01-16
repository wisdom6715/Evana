'use client';
import { useState } from 'react';
import { auth } from '@/lib/firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  AuthError,
  setPersistence, 
  browserLocalPersistence,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

type UserInfo = {
  email: string;
  password: string;
};

const useLogIn = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
  });

  setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Session persistence set to local');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });
  
  // Sign in and sign up function
  const handleAuth = async (): Promise<boolean> => {
    console.log('Creating account');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
      console.log("Account exists, logging in");
      router.replace('/welcome');
      return true;
    } catch (err) {
      const error = err as AuthError;
      if (error.code === 'auth/invalid-credential') {
        console.log('Account does not exist, creating account');
        try {
          await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);
          console.log("Account created successfully!");
          router.replace('/welcome');
          return true;
        } catch (createErr) {
          const createError = createErr as AuthError;
          console.log("Error creating account: ", createError.message);
          return false;
        }
      }
      console.log(error.message);
      alert(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update user info state
  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return {
    isLoading,
    userInfo,
    handleAuth,
    handleInputChange,
  };
};

export default useLogIn;