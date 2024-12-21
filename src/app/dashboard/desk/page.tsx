'use client'
import React from 'react'
import NagivationComponent from '@/_components/NagivationComponent'
import styles from '../_component/styles/desk.module.css'
const page = () => {
  return (
    <div className='w-[100%] h-[100vh] grid grid-cols-[10%_90%] bg-[#FFFDFC]'>
      {/* Navigation is component */}
      <div className='bg-[#FFFDFC] border border-l-zinc-200 grid grid-rows-[90%_10%] pl-4 pr-4'>
        <NagivationComponent />
      </div>
      <div className='w-[100%] h-[100vh] flex items-center justify-center'> 
        <div style={{width: '90%', height: '100%', display: 'grid', gridTemplateRows: '7% 92%', gap: '1%' }}>
            <div style={{backgroundColor: 'gray'}}>
                <div></div>
                <div></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '40% 59%', gap: '1%'}}>
                <div style={{backgroundColor: 'gray'}}></div>
                <div style={{backgroundColor: 'gray'}}></div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default page