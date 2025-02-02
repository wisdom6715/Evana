'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Logo from '@/app/assets/images/newLogo.png'
import Invitation from './_components/Invitation'
import { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth';
import useCheckAuth from '@/app/dashboard/check'
// Get the token when the user logs in or their state changes

const WelcomePage = () => {
    const router = useRouter()
    const [showInvitation, setShowInvitation] = useState(false);
    const [onHover, setHover] = useState(false);  
    const auth = getAuth();
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
    
        // Send the token to the middleware via a cookie
        document.cookie = `authToken=${token}; Path=/; Secure; HttpOnly;`;
      } else {
        // Clear the token if the user logs out
        document.cookie = 'authToken=; Path=/; Max-Age=0;';
      }
    });
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowInvitation(true);
      }, 800);
  
      // Cleanup timer when component unmounts
      return () => clearTimeout(timer);
    }, []);
      const { loading} = useCheckAuth()
      if(loading) {
        return (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )
      }
  return (
    <div className='flex flex-col items-center justify-center w-[100%] h-[100vh] bg-white'>
        <div className='position: absolute left-1 top-0'>
            <Image className='w-32 h-14 md:w-64 md:h-24' src={Logo} alt='Intuitionlabs Logo'/>
        </div>
        <div className='flex flex-col items-center justify-center gap-10'>
            <div className='flex flex-col items-center justify-center w-[90%] md:w-[45%] text-center'>
                <h1 className='text-bold text-[30px] '>Welcome to IntuitionLabs!</h1>
                <p className='text-[15px] text-bold w-[100%]'>Ready to supercharge your team’s productivity? To unlock the platform, you’ll nee d to subscribe to a plan with 30 days money back guaranteed</p>
            </div>
            <div className='w-[222px] h-[48px] bg-[#F9F5F5] hover:shadow-lg transition duration-700 ease-in-out flex flex-row justify-between items-center pl-5 rounded-[20px] text-bold cursor-pointer' style={{backgroundColor: onHover ? 'black' : '#e7e9ea', color: onHover? 'white' : 'black'}} onMouseEnter={()=> setHover(true)} onMouseLeave={()=> setHover(false)} onClick={() => router.push('/pricing')}>
              <p>Subscribe Now</p>
              <div className='w-[48px] h-[48px] rounded-full bg-black items-center flex justify-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="24" height="24" fill='white'>
                      <path d="M23.12,9.91,19.25,6a1,1,0,0,0-1.42,0h0a1,1,0,0,0,0,1.41L21.39,11H1a1,1,0,0,0-1,1H0a1,1,0,0,0,1,1H21.45l-3.62,3.61a1,1,0,0,0,0,1.42h0a1,1,0,0,0,1.42,0l3.87-3.88A3,3,0,0,0,23.12,9.91Z"/>
                  </svg>
              </div>
            </div>
            {showInvitation && <Invitation onClose={() => setShowInvitation(false)} />}
        </div>
    </div>
  )
}
export default WelcomePage