'use client'
import React from 'react'
import NagivationComponent from '@/_components/NagivationComponent'
import Settings from '@/design-system/_component/SettingsChild'
const index = () => {
  return (
    <div className='w-[100%] h-[100vh] grid grid-cols-[10%_90%] bg-[#FFFDFC]'>
      {/* Navigation is component */}
      <div className='bg-[#FFFDFC] border border-l-zinc-200 grid grid-rows-[90%_10%] pl-4 pr-4'>
        <NagivationComponent />
      </div>
      <Settings />
    </div>
  )
}

export default index