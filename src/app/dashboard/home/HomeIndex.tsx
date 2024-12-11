import React from 'react'
import NagivationComponent from '@/_components/NagivationComponent'
import ChatComponent from '@/_components/ChatComponent'
const index = () => {
  return (
    <div className='w-[100%] h-[100vh] grid grid-cols-[10%_70%_20%] bg-[#FFFDFC]'>
      {/* Navigation is component */}
      <div className='bg-[#FFFDFC] border border-l-zinc-200 grid grid-rows-[90%_10%] pl-4 pr-4'>
        <NagivationComponent />
      </div>
      <div className='bg-[#FFFDFC]'></div>
      <div className='bg-[#FFFDFC] border border-l-zinc-200'>
        <ChatComponent />
      </div>
    </div>
  )
}

export default index