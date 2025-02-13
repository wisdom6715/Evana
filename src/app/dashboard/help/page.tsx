'use client'
import React from 'react'
import NagivationComponent from '@/_components/NagivationComponent'
import Tutorial from './_component/Tutorial'
import useCheckAuth from '../useCheck'
import useDeviceCheck from '@/app/useDevice'
import Image from 'next/image';
import Logo from '@/app/assets/images/newLogo.png'

const Page = () => {
  const { loading} = useCheckAuth()
  const isMobile = useDeviceCheck();

  if (isMobile) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg flex flex-col items-center gap-5 shadow-lg text-center">
          <Image src={Logo} alt='Intuitionlabs logo' className='md:w-80 md:h-20 w-36 h-12'/>
          <div>
            <h2 className="text-xl font-bold text-red-500">
              🚫 Mobile Not Supported
            </h2>
            <p className="text-gray-700 mt-2">
              Please use a <strong>laptop</strong> or <strong>desktop</strong> for the best experience.
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='w-[100%] h-[100vh] grid grid-cols-[12%_88%] bg-[#FFFDFC] overflow-y-hidden'>
      {/* Navigation is component */}
      <div className='bg-[#FFFDFC] border border-l-zinc-200 grid grid-rows-[90%_10%] pl-4 pr-4'>
        <NagivationComponent />
      </div>
      {
        loading &&(
          <div className="w-full h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )
      }
      <div className='bg-white flex flex-col justify-center items-center w-full h-full overflow-y-scroll'>
          <Tutorial />
      </div>
    </div>
  )
}

export default Page