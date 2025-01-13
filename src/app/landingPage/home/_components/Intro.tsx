import React from 'react';

const Intro = () => {
  return (
<div className="w-full h-full md:w-[70%] md:h-[70%] flex justify-center flex-col items-center md:items-start">
  <div className="flex flex-col gap-16">
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-[2rem] md:text-[2.5rem] font-bold text-center md:text-left">
          IntuitionLabs: Empowering businesses with AI
        </h1>
        <p className="text-center md:text-left">with AI Employee Supporting Your Team 24/7</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-base text-center md:text-left">
          Transform your business with IntuitionLabs' AI employees—streamline
          tasks, boost productivity, and deliver exceptional customer
          experiences. Start your journey now.
        </p>
        <p className="text-center md:text-left">
          Stay ahead in the AI revolution with CortexLab’s trusted AI
          solutions enhancing your business capabilities.
        </p>
        <p className="text-center md:text-left">
          Stay ahead in the AI revolution with CortexLab’s trusted AI
          solutions enhancing your business capabilities.
        </p>
      </div>
    </div>
    <div className="flex justify-center md:justify-start">
      <button className="px-8 py-2 bg-black text-white rounded">
        Get Started
      </button>
    </div>
  </div>
</div>
  
  );
};

export default Intro;
