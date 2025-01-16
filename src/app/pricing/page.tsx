'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Logo from '@/app/assets/images/newLogo.png'

interface PricingTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  buttonText: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: 'basicPlan',
    name: 'Basic',
    price: 29.99,
    description: 'Basic plan offers free access to all features:',
    features: [
      'unlimited usage',
      'AI training',
      '2 chatbots',
      'Full Customization',
      'Basic Analytics',
      'Simple integrations',
      'Email support',
      'Embed on Unlimited websites',
      'Chat logs summary'
    ],
    buttonText: 'Choose Basic Plan'
  },
  {
    id: 'standardPlan',
    name: 'Standard',
    price: 99.99,
    description: 'Standard plan offers basic features plus:',
    features: [
      'Audio chat',
      'Realtime chat support',
      '5 chatbots',
      '5 desks for real time chat',
      'Voice Realtime Conversation',
      'Conversation categorization',
      'Message broadcasting (widget, in-app and email)',
      'image/document upload on the real time chat feature'
    ],
    buttonText: 'Choose Standard Plan'
  },
  {
    id: 'enterprisePlan',
    name: 'Enterprise',
    price: 199.99,
    description: 'Enterprise plan offers all features plus:',
    features: [
      '10 Chatbots',
      'Multilingual AI support ',
      '10 desks for realtime chat support',
      'Advanced Analytics',
      "Remove powered by 'IntuitionLabs'",
      'Access to upcoming AI products',
    ],
    buttonText: 'Choose Enterprise Plan'
  }
];

const PricingPage = () => {
    const router = useRouter();
    const [isAnnual, setIsAnnual] = useState(false);
    
    const calculatePrice = (basePrice: number) => {
        if (isAnnual) {
            const annualPrice = basePrice * 12;
            const discountedPrice = annualPrice * 0.8; // 20% discount
            return (discountedPrice / 12).toFixed(2);
        }
        return basePrice;
    };

    const handlePricing = (planId: string) => {
        const billingType = isAnnual ? 'annual' : 'monthly';
        // Find the selected tier
        const selectedTier = pricingTiers.find(tier => tier.id === planId);
        
        if (!selectedTier) return;

        // Calculate the actual price based on billing type
        const price = calculatePrice(selectedTier.price);
        
        // Create the URL with the correct plan, billing type, and calculated price
        const queryParams = new URLSearchParams({
            plan: selectedTier.name.toLowerCase(),
            billing: billingType,
            price: price.toString()
        });

        router.push(`/payment?${queryParams.toString()}`);
        console.log(`${planId} selected - ${billingType} billing at $${price}/month`);
    };

    return (
        <>
            <div className='flex flex-col justify-center w-[100%] h-[100vh] items-center absolute inset-0 -z-10 bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] transition-all duration-200'>
                <div className='position: absolute top-0 left-1 '>
                    <Image className='w-64 h-24' src={Logo} alt='Intuitionlabs Logo'/>
                </div>
                <div className='flex flex-col items-center gap-14'>
                    <div className='flex flex-col items-center gap-4'>
                        <h2>Pricing</h2>
                        <p>
                            We offer a variety of pricing plans to suit your needs. Please select your preferred plan below.
                        </p>
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={isAnnual}
                            onChange={(e) => setIsAnnual(e.target.checked)}
                        />
                        <div className="w-[200px] h-10 bg-gray-100 peer-focus:outline-none rounded-full peer 
                            peer-checked:after:translate-x-[100px] 
                            after:content-[''] 
                            after:absolute 
                            after:top-[2px] 
                            after:left-[2px] 
                            after:bg-white 
                            after:shadow-md 
                            after:rounded-full 
                            after:h-[36px]    
                            after:w-[96px]     
                            after:transition-all">
                            {/* Monthly text */}
                            <span className={`absolute left-7 top-1/2 -translate-y-1/2 text-sm z-10 ${!isAnnual ? 'text-black font-semibold' : 'text-gray-400'}`}>
                                Monthly
                            </span>
                            {/* Yearly text */}
                            <span className={`absolute right-7 top-1/2 -translate-y-1/2 text-sm z-10 ${isAnnual ? 'text-black font-semibold' : 'text-gray-400'}`}>
                                Yearly
                            </span>
                        </div>
                    </label>
                    </div>
                    <div className='flex flex-row items-center gap-20'>
                        {pricingTiers.map((tier) => (
                            <div key={tier.id} className='flex flex-col justify-between gap-[28px] border border-[#D9D9D9] w-[351px] h-[600px] p-5'>
                                <div className='flex flex-col gap-7'>
                                    <div className='flex flex-col items-center'>
                                        <h1 className='text-bold text-[30px]'>{tier.name}</h1>
                                    </div>
                                    <div>
                                        <h2 className='text-bold text-[15px] text-lg'>
                                            ${calculatePrice(tier.price)}/mo
                                            {isAnnual && <span className="text-sm text-gray-500 ml-1">(billed annually)</span>}
                                        </h2>
                                        <p>{tier.description}</p>
                                    </div>

                                    <div className='flex flex-col gap-[100px]'>
                                        <div className='flex flex-col gap-[10px]'>
                                            {tier.features.map((feature, index) => (
                                                <div key={index} className='flex flex-row items-center'>
                                                    <svg className='h-6 w-6 text-green-500 mr-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                                                    </svg>
                                                    <p key={index}>{feature}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-[100px]'>
                                    <div className='flex items-center justify-center'>
                                        <button 
                                            style={{ backgroundColor: 'black', color: 'white'}}
                                            className=' w-[270px] h-[38px]'
                                            onClick={() => handlePricing(tier.id)}
                                        >
                                            {tier.buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PricingPage;