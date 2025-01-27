'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Footer from '../_components/Footer'
import Header from '../_components/Header'
import { PlansChart } from './_component/PlansChart'

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

    const handlePricing = () => {
        router.push('/auth');
    };

    return (
        <div className='min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
            <div className=' px-[5%] md:px-[16%] py-4'>
                <Header />
                
                <div className='mt-12 space-y-12'>
                    <div className='text-center space-y-4'>
                        <h2 className='text-[2rem] font-bold md:text-[2.5rem]'>
                            Choose the Ideal Package
                        </h2>
                        <p className='max-w-2xl mx-auto text-lg text-gray-600'>
                            IntuitionLabs provides tailored AI assistant plans to fit your unique needs. Whether you're a growing startup or a large enterprise, our flexible pricing ensures the perfect solution for your business
                        </p>
                        
                        {/* Toggle Switch */}
                        <div className='flex justify-center mt-8'>
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
                                    <span className={`absolute left-7 top-1/2 -translate-y-1/2 text-sm z-10 ${!isAnnual ? 'text-black font-semibold' : 'text-gray-400'}`}>
                                        Monthly
                                    </span>
                                    <span className={`absolute right-7 top-1/2 -translate-y-1/2 text-sm z-10 ${isAnnual ? 'text-black font-semibold' : 'text-gray-400'}`}>
                                        Yearly
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Pricing Cards */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {pricingTiers.map((tier) => (
                            <div 
                                key={tier.id} 
                                className='flex flex-col justify-between border bg-white border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300'
                            >
                                <div className='space-y-6'>
                                    <div className='text-center'>
                                        <h3 className='text-2xl font-bold'>{tier.name}</h3>
                                        <div className='mt-4'>
                                            <span className='text-4xl font-bold'>${calculatePrice(tier.price)}</span>
                                            <span className='text-gray-600'>/mo</span>
                                            {isAnnual && (
                                                <p className='text-sm text-gray-500 mt-1'>billed annually</p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <p className='text-gray-600'>{tier.description}</p>
                                    
                                    <ul className='space-y-3'>
                                        {tier.features.map((feature, index) => (
                                            <li key={index} className='flex items-start'>
                                                <svg className='h-6 w-6 text-green-500 mr-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                                                </svg>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <button 
                                    onClick={() => handlePricing()}
                                    className='mt-8 w-full bg-black text-white py-2 px-4 rounded-md hover:bg-[#9c58ff] transition-colors duration-300'
                                >
                                    {tier.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='mt-16'>
                    <PlansChart />
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default PricingPage;