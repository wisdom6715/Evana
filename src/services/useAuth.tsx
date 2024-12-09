'use client'
import { useState} from 'react';
import {  auth } from '@/lib/firebaseConfig'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

type UserInfo = {
    email?: string;
    password?: any;
};
const useLogIn = () => {
    const [isLoading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({
      email: "",
      password: ""
    });
    
    /// sign in and sign up function
    const handleAuth = async () => {
      console.log('ceating account');
      setLoading(true)
      try {
        await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        console.log("account exists, logging in");
        return true;
      } catch (err: any) {
        if(err.code == 'auth/invalid-credential') {
            console.log('account does not exist, creating account');
            try{
                await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
                console.log("account created successfully!");
                return true;
            }catch(err: any) {
                console.log("Error creating account: ", err.message);
                return false;
            }
            
        }
        console.log(err.message);
        
        alert(err.message)
      }
      finally {
        setLoading(false)
      }
    }
  
  // Update user info state
  const handleInputChange = (field: keyof UserInfo, value:any) => {
    setUserInfo(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };
  return{
    isLoading,
    userInfo,
    handleAuth,
    handleInputChange,
  }
}

export default useLogIn