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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        
        <main className="mt-16">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray sm:text-5xl lg:text-6xl">
              About IntuitionLabs: Leading AI Solutions in CA
            </h1>
            <p className="mt-6 text-xl text-slate-700">
              Explore the diverse types of AI workers shaping the future of business operations 
              from virtual assistants streamlining administrative tasks to advanced data analysts 
              uncovering valuable insights.
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
              href="/" 
              className="inline-block mt-8 px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
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