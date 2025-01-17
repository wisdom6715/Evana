import React from 'react';

const Intro = () => {
  return (
<div className="w-full h-full md:w-[60%] md:h-[70%] flex justify-center flex-col items-center md:items-start">
  <div className="flex flex-col gap-16">
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-[2rem] md:text-[2.5rem] font-bold text-center md:text-left">
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
        <p className="text-center md:text-left">
        Embrace the future with IntuitionLabs trusted AI solutions—designed to supercharge your business and help you stay ahead of the competition..
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

export default Intro;
