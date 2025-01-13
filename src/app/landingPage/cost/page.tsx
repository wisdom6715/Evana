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
            <div className='flex flex-col  w-[100%] h-[100vh] pl-[16%] pr-[16%] gap-[5%] absolute inset-0 -z-10 bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] transition-all duration-200'>
                <div className='justify-center'>
                    {/* <Image className='w-64 h-24' src={Logo} alt='Intuitionlabs Logo'/> */}
                    <Header />
                </div>
                <div className='flex flex-col gap-14'>
                    <div className='flex flex-col items-center gap-4'>
                        <div className='w-[70%] text-center flex gap-5 flex-col'>
                            <h2>AI Pricing Plans: Choose the Best Package for Your Business</h2>
                            <p>
                                CortexLab offers customizable AI assistant plans to suit your specific requirements. Whether you're a small Startup or a large enterprise, 
                                our pricing options ensure that you get the perfect solution for your needs.
                            </p>
                        </div>
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
                    <div className='grid grid-cols-3 gap-[5%]'>
                        {pricingTiers.map((tier) => (
                            <div key={tier.id} className='flex flex-col justify-between gap-[5%] border border-[#D9D9D9] h-[600px] p-5'>
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
                                                <p key={index}>{feature}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-[100px]'>
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
                <PlansChart />
                <Footer />
            </div>
        </>
    );
};

export default PricingPage;