import React from 'react';

export const PlansChart = () => {
  const rows = [
    { Features: 'Price / Month', Basic: '$29.99', Stardand: '$99.99', Enterprise: '$199.99' },
    { Features: 'Unlimited Usage', Basic: 'Maria', Stardand: 'Germany', Enterprise: 'usa' },
    { Features: 'AI training', Basic: 'Maria', Stardand: 'Germany', Enterprise: 'usa' },
    { Features: 'Chatbots', Basic: 'Maria', Stardand: 'Germany', Enterprise: 'usa' },
    { Features: 'Full Customization', Basic: 'Maria', Stardand: 'Germany', Enterprise: 'usa' },
    { Features: 'Analytics', Basic: 'Maria', Stardand: 'Germany', Enterprise: 'usa' },
    { Features: 'Email Support', Basic: 'Maria', Stardand: 'Germany', Enterprise: 'usa' },
    { Features: 'Chatlog', Basic: 'Maria', Stardand: 'Germany', Enterprise: 'usa' },
    { Features: 'Message Broadcasting', Basic: 'Maria', Stardand: 'Germany', Enterprise: 'usa' },
    { Features: 'Audio chat', Basic: 'Maria', Stardand: 'Germany', Enterprise: 'usa' },
    { Features: 'Realtime Chat suport', Basic: 'Maria', Stardand: 'Germany', Enterprise: 'usa' },
    { Features: 'Voice Realtime Communication', Basic: 'Maria', Stardand: 'Germany', Enterprise: 'usa' },
    { Features: 'Image / document upload', Basic: 'Maria', Stardand: 'Germany', Enterprise: 'usa' },
    { Features: 'Multilingual Support', Basic: 'Maria', Stardand: 'Germany', Enterprise: 'usa' },
    { Features: 'Access to upcoming AI products', Basic: 'Maria', Stardand: 'Germany', Enterprise: 'usa' },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-[4rem]">
      <h1 className="text-xl font-semibold">Select Your Plan - Get Started Today!</h1>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">Choose the perfect plan for your needs</th>
              <th className="border border-gray-300 p-2">Basic</th>
              <th className="border border-gray-300 p-2">Stardand</th>
              <th className="border border-gray-300 p-2">Enterprice</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-200 p-2 flex flex-row justify-between">
                    {row.Features} 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21.25 12C21.25 17.1088 17.1088 21.25 12 21.25C6.89121 21.25 2.75 17.1088 2.75 12C2.75 6.89121 6.89121 2.75 12 2.75C17.1088 2.75 21.25 6.89121 21.25 12Z" stroke="url(#paint0_linear_810_2633)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 9C9 5.5 14.5 5.5 14.5 9C14.5 11.5 12 11 12 14M12 18.01L12.01 17.999" stroke="url(#paint1_linear_810_2633)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <defs>
                            <linearGradient id="paint0_linear_810_2633" x1="0.489584" y1="26" x2="33.1304" y2="19.0643" gradientUnits="userSpaceOnUse">
                            <stop offset="0.3" stopColor="#863FFF"/>
                            <stop offset="1" stopColor="#863FFF"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_810_2633" x1="8.58464" y1="20.337" x2="17.8724" y2="19.4041" gradientUnits="userSpaceOnUse">
                            <stop offset="0.3" stopColor="#863FFF"/>
                            <stop offset="1" stopColor="#863FFF"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </td>
                <td className="border border-gray-200 p-2">{row.Basic}</td>
                <td className="border border-gray-200 p-2">{row.Stardand}</td>
                <td className="border border-gray-200 p-2">{row.Enterprise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
