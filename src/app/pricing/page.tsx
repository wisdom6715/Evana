'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

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
      'AI training or customization',
      'Audio chat',
      'no code integrations',
      'email support',
    ],
    buttonText: 'Choose Basic Plan'
  },
  {
    id: 'standardPlan',
    name: 'Standard',
    price: 99.99,
    description: 'Standard plan offers basic features plus:',
    features: [
      'Realtime chat support',
      '3 desks for real time chat',
      'Conversation categorization',
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
      'unlimited desks for realtime chat support',
      'Access to upcoming AI products',
      'Multilingul support',
      'Message broadCasting (in-app, email, widget)'
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
        switch(planId) {
            case 'basicPlan':
                router.push(`/payment?plan=basic&billing=${billingType}`);
                break;
            case 'standardPlan':
                router.push(`/payment?plan=standard&billing=${billingType}`);
                break;
            case 'enterprisePlan':
                router.push(`/payment?plan=enterprise&billing=${billingType}`);
                break;
            default:
                router.push('/');
        }
        console.log(`${planId} selected/ `, billingType);
    };

    return (
        <>
            <div className='flex flex-col justify-center w-[100%] h-[100vh] items-center'>
                <div className='position: absolute top-5 left-5 '>
                    <h1 className='text-bold text-[30px]'>KustomAI</h1>
                </div>
                <div className='flex flex-col items-center gap-14'>
                    <div className='flex flex-col items-center gap-4'>
                        <h2>Pricing</h2>
                        <p>
                            We offer a variety of pricing plans to suit your needs. Please select your preferred plan below.
                        </p>
                        <div className="flex items-center gap-3">
                            <span className={`${!isAnnual ? 'font-semibold' : 'text-gray-500'}`}>Monthly</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={isAnnual}
                                    onChange={(e) => setIsAnnual(e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                            </label>
                            <span className={`${isAnnual ? 'font-semibold' : 'text-gray-500'}`}>
                                Annual <span className="text-sm text-green-600 ml-1">Save 20%</span>
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-row items-center gap-20'>
                        {pricingTiers.map((tier) => (
                            <div key={tier.id} className='flex flex-col gap-[28px] border border-[#D9D9D9] w-[351px] h-[498px] p-5'>
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
                                </div>
                                <div className='flex flex-col gap-[100px]'>
                                    <div className='flex flex-col gap-[10px]'>
                                        {tier.features.map((feature, index) => (
                                            <p key={index}>{feature}</p>
                                        ))}
                                    </div>
                                    <div className='flex items-center justify-center'>
                                        <button 
                                            className='bg-black w-[270px] h-[38px] text-white'
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