import React from 'react'
import NagivationComponent from '@/_components/NagivationComponent'
import ChatComponent from '@/_components/ChatComponent'
import Intro from '@/_components/middle/Intro'
import Milestones from '@/_components/middle/Milestones'
import Update from '@/_components/middle/Update'
const index = () => {
  return (
    <div className='w-[100%] h-[100vh] grid grid-cols-[12%_68%_20%] bg-[#FFFDFC]'>
      {/* Navigation is component */}
      <div className='bg-[#FFFDFC] border border-l-zinc-200 grid grid-rows-[90%_10%] pl-4 pr-4'>
        <NagivationComponent />
      </div>
      <div className='flex flex-col w-[100%] items-center'>
        <div className='grid grid-rows-[20%_50%_20%] w-[90%] h-[100%] gap-[5%]'>
          <Intro />
          <Milestones />
          <Update />
        </div>
      </div>
      <div className='bg-[#FFFDFC] border border-l-zinc-200'>
        <ChatComponent />
      </div>
    </div>
  )
}

export default index