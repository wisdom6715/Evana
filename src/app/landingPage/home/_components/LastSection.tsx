import React from 'react'
import Image from 'next/image'
import SectionImage from './images/lastSectionImage.webp'
const LastSection = () => {
  return (
    <div className="mt-16 flex flex-col justify-center items-center w-full gap-12">
  <div className="flex flex-col items-center text-center">
    <h1 className="text-[2rem] md:text-[2.5rem] font-bold">
      Trusted Partners, Proven <br /> Results
    </h1>
    <p>
      Assign routine and repetitive tasks to digital employees. Integrating them is as simple <br />as working with your HR department
    </p>
  </div>

  <div className="flex flex-col gap-8">
    <Image src={SectionImage} alt="last section image" className="w-full rounded-xl" />
    <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
            <p className="text-4xl font-semibold text-center">
            Join the AI revolution
            </p>
            <p className="text-center sm:text-left">
            Discover how IntuitionLabs can help your business unlock the full potential of AI
            </p>
        </div>
        <div className="flex justify-center">
            <button className="bg-[#9c58ff] py-2 px-8 text-white">Get Started</button>
        </div>
    </div>
  </div>
</div>  
  )
}

export default LastSection