'use client'
import React from 'react'
import Link from 'next/link'
const PrincingPage = () => {
  return (
    <div className='flex flex-col justify-center w-[100%] h-[100vh] items-center'>
        <div className='position: absolute top-5 left-5 '>
            <h1 className='text-bold text-[30px]' >KustomAI</h1>
        </div>
        <div className='flex flex-col items-center gap-14'>
            <div className='flex flex-col items-center'>
                <h2>Pricing</h2>
                <p>
                    We offer a variety of pricing plans to suit your needs. Please select your preferred plan below.
                </p>
            </div>
            <div className=' flex flex-row items-center gap-20'>
                <div className='flex flex-col gap-[28px] border border-[#D9D9D9] w-[351px] h-[498px] p-5 '>
                    <div className='flex flex-col gap-7'>
                        <div className='flex flex-col items-center'>
                            <h1 className='text-bold text-[30px]'>Basic</h1>
                        </div>
                        <div>
                            <h2 className='text-bold text-[15px] text-lg'>$100</h2>
                            <p>
                                Basic plan offers free access to all features.
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[100px]'>
                        <div className='flex flex-col gap-[10px]'>
                            <p>Unpmited text analysis</p>
                            <p>10,000 text samples per month</p>
                            <p>No AI training or customization</p>
                            <p>Voice Communication</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <Link href='/payment' className='bg-black w-[270px] h-[38px] text-white'>Choose Basic Plan</Link>
                        </div>
                    </div>
                </div>

                <div className=' flex flex-col gap-[34px] border border-[#D9D9D9] w-[351px] h-[498px] p-5 '>
                    <div className='flex flex-col gap-7'>
                        <div className='flex flex-col items-center'>
                            <h1 className='text-bold text-[30px]'>Standard</h1>
                        </div>
                        <div className='gap-5'>
                            <h2 className='text-bold text-[15px] text-lg'>$300</h2>
                            <p>
                                Standard plan offers
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[65px]'>
                        <div className='flex flex-col gap-[15px]'>
                            <p>Unpmited text analysis</p>
                            <p>10,000 text samples per month</p>
                            <p>No AI training or customization</p>
                            <p>Voice Communication</p>
                            <p>Voice Communication</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <Link href='/payment' className='bg-black w-[270px] h-[38px] text-white'>Choose Standard Plan</Link>
                        </div>
                    </div>
                </div>
            </div>       
        </div>
    </div>
  )
}

export default PrincingPage