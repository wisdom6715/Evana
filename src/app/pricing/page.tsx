'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Logo from '@/app/assets/images/newLogo.png'
import useCheckAuth from '@/app/dashboard/check'

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
        const selectedTier = pricingTiers.find(tier => tier.id === planId);
        
        if (!selectedTier) return;

        const price = calculatePrice(selectedTier.price);
        
        const queryParams = new URLSearchParams({
            plan: selectedTier.name.toLowerCase(),
            billing: billingType,
            price: price.toString()
        });

        router.push(`/payment?${queryParams.toString()}`);
    };
     const { loading} = useCheckAuth()
      if(loading) {
        return (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )
      }
    return (
        <div className='min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] px-4 py-1 sm:px-6 lg:px-8'>
            {/* Logo Section */}
            <div className='mb-8 md:mb-1'>
                <Image 
                    src={Logo} 
                    alt='Intuitionlabs Logo'
                    className='w-32 md:w-64 md:h-24 h-12'
                    priority
                />
            </div>

            {/* Main Content Container */}
            <div className='max-w-7xl mx-auto'>
                {/* Header Section */}
                <div className='text-center mb-8 md:mb-12'>
                    <h2 className='text-3xl sm:text-4xl font-bold mb-4'>Pricing Plans</h2>
                    <p className='text-gray-600 max-w-2xl mx-auto mb-8'>
                        We offer a variety of pricing plans to suit your needs. Please select your preferred plan below.
                    </p>

                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer mx-auto">
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
                            <span className={`absolute left-7 top-1/2 -translate-y-1/2 text-sm z-10 ${!isAnnual ? 'text-black font-semibold' : 'text-gray-400'}`}>
                                Monthly
                            </span>
                            <span className={`absolute right-7 top-1/2 -translate-y-1/2 text-sm z-10 ${isAnnual ? 'text-black font-semibold' : 'text-gray-400'}`}>
                                Yearly
                            </span>
                        </div>
                    </label>
                </div>

                {/* Pricing Cards Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
                    {pricingTiers.map((tier) => (
                        <div 
                            key={tier.id} 
                            className='flex flex-col justify-between bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300'
                        >
                            {/* Card Header */}
                            <div className='space-y-6'>
                                <div className='text-center'>
                                    <h3 className='text-2xl font-bold mb-2'>{tier.name}</h3>
                                    <div className='text-3xl font-bold mb-2'>
                                        ${calculatePrice(tier.price)}
                                        <span className='text-base font-normal text-gray-600'>/mo</span>
                                    </div>
                                    {isAnnual && (
                                        <span className="text-sm text-gray-500">billed annually</span>
                                    )}
                                </div>

                                <div className='text-gray-600'>
                                    <p className='font-medium mb-4'>{tier.description}</p>
                                    <ul className='space-y-3'>
                                        {tier.features.map((feature, index) => (
                                            <li key={index} className='flex items-start'>
                                                <svg className='h-6 w-6 text-green-500 mr-2 flex-shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                                                </svg>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className='mt-8'>
                                <button 
                                    style={{backgroundColor: tier.id === 'standardPlan'? '#9c58ff' : 'black'}}
                                    className='w-full py-3 px-4 text-white rounded transition-colors duration-200 hover:bg-[#9c58ff]'
                                    onClick={() => handlePricing(tier.id)}
                                >
                                    {tier.buttonText}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingPage;