'use client'
import React from 'react'
import NagivationComponent from '@/_components/NagivationComponent'
// import styles from '../_component/styles/desk.module.css'
import MessageItem from '../_component/desksComponent/MessageItem'
import MessageChat from '../_component/desksComponent/MessageChat'
const page = () => {
  return (
    <div className='w-[100%] h-[100vh] grid grid-cols-[12%_88%] bg-[#FFFDFC]'>
      {/* Navigation is component */}
      <div className='bg-[#FFFDFC] border border-l-zinc-200 grid grid-rows-[90%_10%] pl-4 pr-4'>
        <NagivationComponent />
      </div>
      <div className='w-[100%] h-[100vh] flex items-center justify-center'> 
        <div style={{width: '90%', height: '97%', display: 'grid', gridTemplateRows: '7% 92%', gap: '.8%' }}>
            <div style={{backgroundColor: 'white', gap: '.2rem', display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', flexDirection: 'row', gap: '.5rem', color: 'black', height: '2rem'}}>
                    <p>Open</p>
                    <p>Ongoing</p>
                </div>
                <div style={{backgroundColor: '#F9F9F9', height: '2rem', color: 'black', borderStyle: 'solid', borderWidth: '.1rem', borderColor: '#E3E3E3', paddingLeft: '.5rem'}}>
                    <p>Customers</p>
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '40% 59%', gap: '1%', backgroundColor: 'white'}}>
                <div style={{backgroundColor: 'white',  borderStyle: 'solid', borderWidth: '.1rem', borderColor: '#DFDFDF', overflowY: 'scroll'}}>
                  <MessageItem />
                </div>
                <div style={{backgroundColor: 'white',  borderStyle: 'solid', borderWidth: '.1rem', borderColor: '#DFDFDF'}}>
                  <MessageChat />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default page