'use client'
import React from 'react';
import NagivationComponent from '@/_components/NagivationComponent'
import Summary from '../_component/chatlogComponent/Summary'
// import useCheckAuth from '../useCheck'
const Index = () => {


  return (
    <div className='w-[100%] h-[100vh] grid grid-cols-[12%_88%] bg-[#FFFDFC] '>
      {/* Navigation is component */}
      <div className='bg-[#FFFDFC] border border-l-zinc-200 grid grid-rows-[90%_10%] pl-4 pr-4'>
        <NagivationComponent />
      </div>
      {/* {
        loading &&(
          <div className="w-full h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )
      } */}
      <Summary  />
    </div>
  )
}

export default Index