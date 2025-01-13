import React from 'react'
import Header from '@/app/landingPage/_components/Header'
import ChatDemo from './_component/ChatDemo'
import DemoBenefits from './_component/DemoBenefits'
import Footer from '../_components/Footer'
import Link from 'next/link'
const page = () => {
  return (
    <div>
      <div className='flex flex-col  w-[100%] h-[100vh] pl-[16%] pr-[16%]'>
        <Header />
        <div className='flex flex-col mt-[4rem] w-[100%]'>
          <div className='flex flex-col items-center text-center'>
            <h1>About IntuitionLabs: Leading AI Solutions in CA</h1>
            <p className='w-[80%]'>Explore the diverse types of AI workers shaping the future of business operations from virtual assistants streamlining administrative tasks to advanced data analysts uncovering valuable insights.</p>
          </div>

          <div className='mt-[5rem]'>
            <div className='grid grid-cols-2 w-[100%] h-[40rem] mt-[2rem]'>
              <div>
                <DemoBenefits  type='virtual'/>
              </div>
              <div >
              <ChatDemo type='virtual' />
              </div>
            </div>

            <div className='grid grid-cols-2 w-[100%] h-[40rem] mt-[4rem]'>
              <div>
                <DemoBenefits  type='appointment'/>
              </div>
              <div >
              <ChatDemo type='appointment' />
              </div>
            </div>

            <div className='grid grid-cols-2 w-[100%] h-[40rem] mt-[4rem]'>
              <div>
                <DemoBenefits  type='support'/>
              </div>
              <div >
              <ChatDemo type='support' />
              </div>
            </div>
            

            <div className='grid grid-cols-2 w-[100%] h-[40rem] mt-[4rem]'>
              <div>
                <DemoBenefits  type='sales'/>
              </div>
              <div >
              <ChatDemo type='sales' />
              </div>
            </div>
          </div>
          <div style={{margin: '5rem 0'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem'}}>
              <p style={{fontSize: '2rem', fontWeight: 650}}>Let’s us grow for you <br />
              any aI Employee!</p>
              <Link href='/' style={{padding: '.5rem 2rem', backgroundColor: 'black', color: 'white'}}>Get Started</Link>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default page