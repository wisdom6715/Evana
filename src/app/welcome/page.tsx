import React from 'react'
import Link from 'next/link'
const WelcomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center w-[100%] h-[100vh] bg-white'>
        <div className='position: absolute left-5 top-5'>
            <h1 className='text-bold text-[30px] '>KustomAI</h1>
        </div>
        <div className='flex flex-col items-center justify-center gap-10'>
            <div className='flex flex-col items-center justify-center w-[45%] text-center'>
                <h1 className='text-bold text-[30px] '>Welcome to KustomAI!</h1>
                <h2 className='text-[15px] text-bold'>Ready to supercharge your team’s productivity? To unlock the platform, you’ll nee d to subscribe to a plan and try it free for 7 days</h2>
            </div>
            <div className='w-[222px] h-[48px] bg-[#F9F5F5] flex flex-row justify-between items-center pl-5 rounded-[20px] text-bold'>
                <Link href='/pricing'>Subscribe Now</Link>
                <div className='w-[48px] h-[48px] rounded-full bg-black'></div>
            </div>
        </div>

    </div>
  )
}
export default WelcomePage