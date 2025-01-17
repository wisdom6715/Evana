import React from 'react';
import Image from 'next/image';
import Support from '@/app/landingPage/home/_components/images/support.webp';

const HumanSupport = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-16 gap-12">
        <Image src={Support} alt="customer support with bot" />
        <div className="bg-white w-[90%] flex flex-col justify-center items-center md:items-start gap-12">
            <div className="flex flex-col justify-center items-center md:items-start gap-2">
            <p className="text-red-400 text-lg">Empower your team with AI</p>
            <div className="flex flex-col justify-center items-center md:items-start gap-6">
                <h1 className="text-[2rem] md:text-[2.5rem] font-bold text-center md:text-left">
                Enhance Customer experience
                </h1>
                <p className="text-l font-normal text-center md:text-left">
                IntuitionLabs' AI-powered solutions streamline your operations, saving time and cutting costs. By enhancing customer experiences with personalized, faster interactions, we help you stay ahead of the competition and unlock new growth opportunities
                </p>
            </div>
            </div>
            <div className="flex justify-center md:justify-start">
            <button className="px-8 py-2 bg-black text-white rounded hover:bg-[#9c58ff]">
                Get Started
            </button>
            </div>
        </div>
    </div>
  );
};

export default HumanSupport;