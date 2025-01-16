'use client'
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import usePaymant from '@/services/usePaymant'
import masterCard from '@/app/assets/images/mastercard.jpeg'
import visaCard from '@/app/assets/images/visacard.jpeg'
import applePay from '@/app/assets/images/ApplePay.jpeg'
import googlePay from '@/app/assets/images/gPay.jpeg'
import secureIcon from '@/app/assets/images/secureIcon.png'
import Logo from '@/app/assets/images/Screenshot 2025-01-11 090739.png'
import {auth} from '@/lib/firebaseConfig'
import DisplayDate from '@/_components/_subComponent/DisplayDate'

// Dynamically import PaystackButton to prevent SSR issues
const DynamicPaystackButton = dynamic(() => 
  import('react-paystack').then((mod) => mod.PaystackButton), 
  { ssr: false }
);

// Separate component for the payment content
const PaymentContent = () => {
  const router = useRouter()
  const {isClient, componentProps, queryParams} = usePaymant();
  const user = auth.currentUser;

  return (
    <div className='w-full bg-yellow-100 grid grid-rows-[5%_92%_3%] h-screen'>
      <div className='bg-white h-full border-b border-gray-200 flex items-center'>
        <Image className='w-52 h-10 pl-3' src={Logo} alt='Intuitionlabs Logo'/>
      </div>
      {/* main payment container */}
      <div className='bg-gray-300 h-full flex justify-center'>
        <div className='h-full w-[80%] bg-gray-100 grid grid-cols-[75%_25%]'>
          <div className='bg-[#FBFBFB] w-full h-full flex items-center pl-10'>
            <div className='w-[60%] h-[90%] flex flex-col gap-4'>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <p className='text-lg text-black'>Step 1 of 2</p>
                  <h2 className='text-2xl text-black'>Enter payment info to start your free trial</h2>
                </div>

                <div className='flex flex-col gap-2'>
                  <p className='text-lg text-black'>Signed in as</p>
                  <h3 className='text-sm text-gray-400'>{user?.email || 'loading...'}</h3>
                </div>
              </div>

              <div className='flex flex-col gap-5'>
                <div className='flex flex-col gap-3'>
                  <p className='text-lg text-black'>Your payment method</p>
                  <div className='flex flex-row items-center space-x-2'>
                    <Image height={40} width={40} alt='mastercard icon' src={masterCard}/>
                    <Image height={40} width={40} alt='visa card' src={visaCard}/>
                    <Image height={40} width={40} alt='Apple pay' src={applePay}/>
                    <Image height={40} width={40} alt='Google pay' src={googlePay}/>
                  </div>
                </div>

                <div className='flex flex-col gap-4'>
                  {/* Dynamically render Paystack button only on client side */}
                  {isClient && (
                    <DynamicPaystackButton
                      className='w-[474px] h-[45px] border border-gray-300' 
                      {...componentProps} 
                      text='Debit/Credit'
                    />
                  )}
                  <button className='w-[474px] h-[45px] border border-gray-300'>Apple pay</button>
                </div>

                <div className='flex flex-col gap-3'>
                <p className="w-[474px] text-left text-xs">
                  By clicking &quot;Agree and subscribe,&quot; you agree: After your free trial ends on{' '}
                  <span style={{ fontSize: '0.75rem', fontWeight: 'normal', lineHeight: '1rem' }}>
                    <DisplayDate daysToAdd={7} />
                  </span>You will be charged ${queryParams.price?.toLocaleString('en-us')} {queryParams.billing}, your subscription will automatically renew {queryParams.billing} until you cancel. Price subject to change at renewal.
                </p>
                  <div className='flex flex-row items-center gap-2'>
                    <div className='flex flex-row items-center gap-3'>
                      <input type="checkbox" />
                      <p>Agree and Subscribe</p>
                    </div>
                    <button 
                      className='w-[120px] h-[45px]' 
                      onClick={() => router.back()}
                    >
                      Go back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar for payment options */}
          <div className='bg-white border-l border-gray-200 p-3 h-full flex flex-col gap-12'>
            <div className='flex flex-col gap-3'>
              <h1 className='font-bold'>Your cart</h1>
              <div className='flex flex-col gap-8 border border-gray-300 rounded-lg p-3 h-[135px]'>
                <div className='flex flex-row justify-between'>
                  <h1>IntuitionLabs</h1>
                  <p>7 days free trial</p>
                </div>
                <div className='flex flex-col gap-1'>
                  <h1>Subscription</h1>
                  <div className='flex flex-row justify-between'>
                    <p>{queryParams.plan} {queryParams.billing} plan</p>
                    <p>${queryParams.price?.toLocaleString('en-us')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='border-t border-gray-300 flex flex-col gap-5 p-3'>
              <div className='flex flex-row justify-between items-center'>
                <p>DUE NOW</p>
                <p>$0.00</p>
              </div>
              <div className='flex flex-row justify-between items-start'>
                <div className='flex flex-col justify-between'>
                  <DisplayDate daysToAdd={7} className='text-l'/>
                  <p>7 days trial ends</p>
                </div>
                <p>${queryParams.price?.toLocaleString('en-us')}</p>
              </div>
            </div>

            <div className='flex flex-col gap-1 p-3'>
              <p>Free trial terms</p>
              <div className='flex flex-col justify-between items-start border-t border-gray-300 gap-5 p-3'>
                <div className='flex flex-row items-center'>
                  <svg className='h-6 w-6 text-green-500 mr-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                  <p>Free trial ends in 7 days</p>
                </div>
                <div className='flex flex-row items-center'>
                  <svg className='h-6 w-6 text-green-500 mr-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                  <p>You have access to features available for your plan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer section for the payment page*/}
      <div className='bg-gray-300 h-full border-t border-gray-400 flex flex-row items-center gap-3 pl-10'>
        <Image height={15} width={15} alt='secure icon' src={secureIcon}/>
        <p>Secure transactions</p>
      </div>
    </div>
  );
};

// Loading component
const LoadingComponent = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

// Main component with Suspense
const PaymentPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <PaymentContent />
    </Suspense>
  );
};

export default PaymentPage;