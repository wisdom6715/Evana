'use client'
import React from 'react'
// import { useEffect, useState } from 'react'
import NagivationComponent from '@/_components/NagivationComponent'
import ChatComponent from '@/_components/ChatComponent'
import Intro from '@/_components/middle/Intro'
import Milestones from '@/_components/middle/Milestones'
import Notification from '@/_components/middle/Notification'
import useCheckAuth from '../check'
const index = () => {
    const { loading} = useCheckAuth()
    if(loading) {
      return (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )
    }
  return (
    <div className='w-[100%] h-[100vh] grid grid-cols-[12%_88%] bg-[#FFFDFC] overflow-y-hidden'>
      {/* Navigation is component */}
      <div className='bg-[#FFFDFC] border border-l-zinc-200 grid grid-rows-[90%_10%] pl-4 pr-4'>
        <NagivationComponent />
      </div>
      <div className='w-[100%] h-[100vh] grid grid-cols-[80%_20%] bg-[#fffff]'> 
        <div className='flex flex-col w-[100%] items-center'>
          <div className='grid grid-rows-[23%_40%_29%] w-[90%] h-[100%] gap-[3%]'>
            <Intro />
            <Milestones />
            <Notification />
          </div>
        </div>
        <div className='bg-[#FFFDFC] border border-l-zinc-200'>
          <ChatComponent />

        </div>
        
      </div>
    </div>
  )
}

export default index