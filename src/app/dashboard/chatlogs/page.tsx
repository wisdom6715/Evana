'use client'
import React from 'react'
import NagivationComponent from '@/_components/NagivationComponent'
import Settings from '@/design-system/_component/Settings'
const index = () => {
  return (
    <div className='w-[100%] h-[100vh] grid grid-cols-[12%_88%] bg-[#FFFDFC]'>
      {/* Navigation is component */}
      <div className='bg-[#FFFDFC] border border-l-zinc-200 grid grid-rows-[90%_10%] pl-4 pr-4'>
        <NagivationComponent />
      </div>
      chatlog component to be displayed here
    </div>
  )
}

export default index