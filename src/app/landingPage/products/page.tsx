import React from 'react';
import Header from '@/app/landingPage/_components/Header';
import ChatDemo from './_component/ChatDemo';
import DemoBenefits from './_component/DemoBenefits';
import Footer from '../_components/Footer';
import Link from 'next/link';

const ProductPage = () => {
  const sections = ['virtual', 'appointment', 'support', 'sales'] as const;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-white">
      <div className="mx-auto md:px-[16%] py-4 px-[5%]">
        <Header />
        
        <main className="mt-16">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-[2rem] font-bold text-gray lg:text-[2.5rem]">
              IntuitionLabs: Commercializing AI to Drive Business Success
            </h1>
            <p className="mt-6 text-l text-slate-700">
              Unleash the power of AI to transform your business—automate tasks, improve efficiency, 
              and unlock actionable insights that accelerate growth and drive success
            </p>
          </div>

          {/* Product Sections */}
          <div className="mt-20 space-y-32">
            {sections.map((type) => (
              <section 
                key={type}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className="lg:pr-8">
                  <DemoBenefits type={type} />
                </div>
                <div className="lg:pl-8">
                  <ChatDemo type={type} />
                </div>
              </section>
            ))}
          </div>

          {/* CTA Section */}
          <div className="my-32 text-center">
            <h2 className="text-4xl font-bold text-black">
              Let us grow your business with<br />
              any AI Employee!
            </h2>
            <Link 
              href="/auth" 
              className="inline-block mt-8 px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-[#9c58ff] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ProductPage;