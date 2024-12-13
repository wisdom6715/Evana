'use client'
import React from 'react'
import { PaystackButton } from 'react-paystack'
import Image from 'next/image'
import masterCard from '@/app/assets/images/mastercard.jpeg'
import visaCard from '@/app/assets/images/visacard.jpeg'
import applePay from '@/app/assets/images/ApplePay.jpeg'
import googlePay from '@/app/assets/images/gPay.jpeg'
import secureIcon from '@/app/assets/images/secureIcon.png'
import Link from 'next/link'

const PaymentPage = () => {

  const publicKey = 'pk_live_85b70a04648ec72c551f83d8a21d1d93019dfb14'
  const amount = 5000 * 100; // Amount in kobo
  const email = "customer@example.com";
  const name = "wisdom ajibola";

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      custom_fields: [
        {
          display_name: "Phone Number",
          variable_name: "phone_number",
          value: "+2348123456789", // Replace with actual phone number
        },
      ],

    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for donating to us! we do not take it for granted!!"),
    onClose: () => alert("Wait! You need to donate, don't go!!!!"),
  }

  return (
    <div className='w-[100%] bg-yellow-100 grid grid-rows-[5%_92%_3%] h-[100vh]'>
      <div className='bg-white h-[100%] border border-b-1 border-gray-200'>
        <h1 className='text-bold text-[25px] text-black pl-10'>KustomAI</h1>
      </div>
      {/* main payment container */}
      <div className='bg-gray-300 h-[100%] flex justify-center'>
        <div className='h-[100%] w-[80%] bg-gray-100 grid grid-cols-[75%_25%]'>
          <div className='bg-[#FBFBFB] w-[100%] h-[100%] flex items-center pl-[40px]'>
            <div className='w-[60%] h-[90%] flex flex-col gap-[16px]'>

              <div className='flex flex-col gap-[16px]'>
                <div className='flex flex-col gap-[5px] '>
                  <p className='text-bold text-[16px] text-black'>Step 1 of 2</p>
                  <h2 className='text-bold text-[24px] text-black'>Enter payment info to start your free trial</h2>
                </div>

                <div className='flex flex-col gap-[5px] '>
                  <p className='text-lg text-[16px] text-black'>Signed in as</p>
                  <h3 className=' text-[14px] text-gray-400'>Bostonconsult@outlook.com</h3>
                </div>
              </div>

              <div className='flex flex-col gap-[20px] '>

                <div className='flex flex-col gap-[10px]'>
                  <p className='text-lg text-[16px] text-black'>Your payment method</p>
                  <div className='flex flex-row items-center'>
                    <Image height={40} alt= 'mastercard icon' src={masterCard}/>
                    <Image height={40} alt='visa card' src={visaCard}/>
                    <Image height={40} alt= 'Apple pay' src={applePay}/>
                    <Image height={40} alt='Google pay' src={googlePay}/>
                  </div>
                </div>

                <div className='flex flex-col gap-[16px] '>

                  {/* drop down form for card payment here */}

                  <PaystackButton className={'w-[474px] h-[45px] border border-gray-300'} {...componentProps} text='Debit/Credit'/>
                  <button className='w-[474px] h-[45px] border border-gray-300'>Gpay</button>
                  <button className='w-[474px] h-[45px] border border-gray-300'>Apple pay</button>
                  {/* drop down form for Google payment here */}

                </div>

                <div className='flex flex-col gap-[10px]'>
                  <p className={'w-[474px] text-left text-[12px]'}>
                    By clicking “Agree and subscribe,” you agree: After your free trial ends on Dec 14, 2024, you will be charged  US$22.99  (plus tax) monthly. \
                    At the end of your one-year term, your subscription will automatically renew monthly until you cancel. No annual commitment required after the first year. 
                    Price subject to change at renewal. Cancel before the free trial ends and you won’t be charged. Cancel before Dec 28, 2024 to get a full refund and avoid a fee. 
                    Cancel anytime via Adobe Account or Customer Support. You also agree to the Terms of Use and the Subscription and Cancellation Terms.
                  </p>
                  <div className='flex flex-row items-center gap-2'>
                    <Link href='/dashboard/home' className='w-[300px] h-[45px] bg-black text-white'>Agree and Subscribe</Link>
                    <button className='w-[120px] h-[45px]'>Go back</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
          {/* side bar for payment options */}

          <div className='bg-white border border-l-1 border-gray-200 p-3 h-[100%] flex flex-col gap-[50px]'>
            {/* cart items */}

            <div className='flex flex-col gap-3'>
              <h1>Your cart</h1>
              <div className='flex flex-col gap-8 border border-gray-300 rounded-lg p-3 h-[135px]'>
                <div className='flex flex-row justify-between'>
                  <h1>KustomAI</h1>
                  <p>7 free trial</p>
                </div>
                <div className='flex flex-col gap-1'>
                  <h1>Subscription</h1>
                  <div className='flex flex-row justify-between'>
                    <p>Annually, monthly billed</p>
                    <p>$20.00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className=' border-t-[1px] border-gray-300 flex flex-col gap-5 p-3'>
              <div className='flex flex-row justify-between items-center'>
                <p>DUE NOW</p>
                <p>$0.00</p>
              </div>
              <div className='flex flex-row justify-between items-start'>
                <div className='flex flex-col justify-between'>
                  <p>DEC 14, 2024</p>
                  <p>7 days trial ends</p>
                </div>
                <p>$20.00</p>
              </div>
            </div>

            <div className=' flex flex-col gap-1 p-3'>
              <p>Free trial terms</p>
              <div className='flex flex-col justify-between items-start border-t-[1px] border-gray-300 gap-5 p-3'>
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
          {/* footer section for the payment page*/}

        </div>
      </div>
      {/* footer section for the payment page*/}
      <div className='bg-gray-300 h-[100%] border border-t-1 border-gray-400 flex flex-row items-center gap-3 pl-10'>
        <Image height={15} alt='secure icon' src={secureIcon}/>
        <p>Secure transactions</p>
      </div>
    </div>
  )
}

export default PaymentPage