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

// Dynamically import PaystackButton to prevent SSR issues
const DynamicPaystackButton = dynamic(() => 
  import('react-paystack').then((mod) => mod.PaystackButton), 
  { ssr: false }
);

// Separate component for the payment content
const PaymentContent = () => {
  const router = useRouter()
  const {isClient, componentProps, queryParams} = usePaymant();

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
                  <p className='font-bold text-base text-black'>Step 1 of 2</p>
                  <h2 className='font-bold text-2xl text-black'>Enter payment info to start your free trial</h2>
                </div>

                <div className='flex flex-col gap-2'>
                  <p className='text-lg text-black'>Signed in as</p>
                  <h3 className='text-sm text-gray-400'>Bostonconsult@outlook.com</h3>
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
                  <p className='w-[474px] text-left text-xs'>
                    By clicking &quot;Agree and subscribe,&quot; you agree: After your free trial ends on Dec 14, 2024, you will be charged US$22.99 (plus tax) monthly. 
                    At the end of your one-year term, your subscription will automatically renew monthly until you cancel. No annual commitment required after the first year. 
                    Price subject to change at renewal. Cancel before the free trial ends and you won&apos;t be charged. Cancel before Dec 28, 2024 to get a full refund and avoid a fee. 
                    Cancel anytime via Adobe Account or Customer Support. You also agree to the Terms of Use and the Subscription and Cancellation Terms.
                  </p>
                  <div className='flex flex-row items-center gap-2'>
                    <button 
                      className='w-[300px] h-[45px] bg-black text-white' 
                      onClick={() => router.replace('/dashboard/home')}
                    >
                      Agree and Subscribe
                    </button>
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
                  <h1>KustomAI</h1>
                  <p>7 free trial</p>
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
                  <p>DEC 14, 2024</p>
                  <p>7 days trial ends</p>
                </div>
                <p>${queryParams.price?.toLocaleString('en-us')}</p>
              </div>
            </div>

            <div className='flex flex-col gap-1 p-3'>
              <p>Free trial terms</p>
              <div className='flex flex-col justify-between items-start border-t border-gray-300 gap-5 p-3'>
                <div className='flex flex-row items-center'>
                  <p>box </p>
                  <p>7 days free trial ends</p>
                </div>
                <div className='flex flex-row items-center'>
                  <p>box </p>
                  <p>7 days free trial ends</p>
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