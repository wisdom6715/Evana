import React from 'react'
import Image from 'next/image'
import BotImage from './images/Bot.webp'
import Link from 'next/link'

const BotCall = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-16 w-full">
      <Image src={BotImage} alt="Bot image" className="bg-red-500" />
      <div className="flex flex-col gap-8 justify-center items-center sm:items-start">
        <div className="flex flex-col justify-center items-center sm:items-start gap-4">
          <p className="text-center sm:text-left">Join the AI Revolution</p>
          <h1 className="text-[2rem] md:text-[2.5rem] font-bold text-center sm:text-left">
            Empower Businesses with
          </h1>
          <p className="text-l text-center sm:text-left">
            At IntuitionLabs, we’re dedicated to empowering your business with cutting-edge AI technology. Our team of experts works relentlessly to create innovative, tailored solutions that streamline operations, enhance customer experiences, and drive growth. With our AI-powered tools, you can stay ahead of the competition and unlock new possibilities for success.
          </p>
        </div>
    
        <div className="flex justify-center sm:justify-start">
          <Link href='/auth' className="py-2 px-8 bg-black text-white rounded hover:bg-[#9c58ff]">Get Started</Link>
        </div>
      </div>
  </div>  
  )
}

export default BotCall