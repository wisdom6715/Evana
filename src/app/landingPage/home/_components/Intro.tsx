import React from 'react';
import { useRouter } from 'next/navigation';

const Intro = () => {
  const router = useRouter()
  return (
<div className="w-full h-full md:w-[60%] md:h-[70%] flex justify-center flex-col items-center md:items-start">
  <div className="flex flex-col gap-10">
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-[2rem] md:text-[2rem] font-bold text-center md:text-left">
          IntuitionLabs: <br className='hidden md:block'/> Empowering businesses with AI
        </h1>
        <p className="text-center text-l md:text-left">with AI Employee Supporting Your Team 24/7</p>
      </div>
      <div className="flex flex-col gap-2 text-l">
        <p className="text-center md:text-left">
          Transform your business with IntuitionLabs' AI employees—streamline
          tasks, boost productivity, and deliver exceptional customer
          experiences. Start your journey now.
        </p>
        <p className="text-center md:text-left">
        Unlock the power of AI with IntuitionLabs! Our trusted solutions are here to help you boost your business, making everyday tasks smarter and more efficient
        </p>
      </div>
    </div>
    <div className="flex justify-center md:justify-start">
      <button className="px-8 py-2 bg-black text-white rounded hover:bg-[#9c58ff] transition duration-700 ease-in-out" onClick={()=> router.push('/auth')}>
        Get Started
      </button>
    </div>
  </div>
</div>
  
  );
};

export default Intro;
