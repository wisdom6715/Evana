'use client'
import React from 'react'
import NagivationComponent from '@/_components/NagivationComponent'
import useCheckAuth from '../useCheck'
import useDeviceCheck from '@/app/useDevice'
import Image from 'next/image';
import Logo from '@/app/assets/images/newLogo.png'

const Index = () => {
    const { loading} = useCheckAuth()
    const isMobile = useDeviceCheck();
    const data = [
        {
          name: "John Smith",
          email: "john.smith@email.com",
          contact: "555-0123"
        }
    ];

    if (isMobile) {
      return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-6 rounded-lg flex flex-col items-center gap-5 shadow-lg text-center">
            <Image src={Logo} alt='Intuitionlabs logo' className='md:w-80 md:h-20 w-36 h-12'/>
            <div>
              <h2 className="text-xl font-bold text-red-500">
                🚫 Mobile Not Supported
              </h2>
              <p className="text-gray-700 mt-2">
                Please use a <strong>laptop</strong> or <strong>desktop</strong> for the best experience.
              </p>
            </div>
        </div>
        </div>
      );
    }
  return (
    <div className='w-[100%] h-[100vh] grid grid-cols-[12%_88%] bg-[#FFFDFC] overflow-y-hidden'>
      {/* Navigation is component */}
      <div className='bg-[#FFFDFC] border border-l-zinc-200 grid grid-rows-[90%_10%] pl-4 pr-4'>
        <NagivationComponent />
      </div>

      {
        loading && (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )
      }
       <div className='w-[100%] h-[100vh] bg-[#fffff] flex flex-col justify-center items-center'>
            <div className='h-[95%] w-[80%] grid grid-rows-[7%_93%]'>
                <div className='flex flex-col'>
                  <h1 className='text-xl font-bold'>Leads Contact</h1>
                  <p className='text-base text-gray-500'>These are the contacts of leads captured by the AI. Kindly export the leads to your Email service provider like Mailchimp to send them messages</p>
                </div>

                <div className='h-[100%] w-[100%] bg-white border grid grid-rows-[6%_94%]'>
                    <div className='w-[100%] h-[100%] flex flex-row justify-between items-center px-3 py-2'>
                        <div className='flex flex-row gap-2 items-center w-[100%] h-[100%]'>
                            <select 
                            className="border rounded px-2 py-1"
                            >
                                <option value="daily">Daily (select date)</option>
                                <option value="weekly">Weekly (select start date)</option>
                                <option value="monthly">Monthly (select month)</option>
                            </select>
                            <input type="date" className='w-[10%] h-[90%]border rounded px-2 py-1' placeholder='  Search'/>
                        </div>
                        <button  className='flex flex-row items-center py-1 px-3 gap-3 bg-green-500 rounded-sm hover:bg-green-600 transition-colors'>
                            <p className='text-white'>Export</p>
                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" fill="white" viewBox="0 0 24 24" width="20" height="20">
                            <path d="M17.974,7.146c-.332-.066-.603-.273-.742-.569-1.552-3.271-5.143-5.1-8.735-4.438-3.272,.6-5.837,3.212-6.384,6.501-.162,.971-.15,1.943,.033,2.89,.06,.309-.073,.653-.346,.901-1.145,1.041-1.801,2.524-1.801,4.07,0,3.032,2.467,5.5,5.5,5.5h11c4.136,0,7.5-3.364,7.5-7.5,0-3.565-2.534-6.658-6.026-7.354Zm-1.474,12.854H5.5c-1.93,0-3.5-1.57-3.5-3.5,0-.983,.418-1.928,1.146-2.59,.786-.715,1.155-1.773,.963-2.763-.138-.712-.146-1.445-.024-2.181,.403-2.422,2.365-4.421,4.771-4.862,.385-.07,.768-.104,1.145-.104,2.312,0,4.406,1.289,5.422,3.434,.414,.872,1.2,1.481,2.158,1.673,2.559,.511,4.417,2.778,4.417,5.394,0,3.032-2.467,5.5-5.5,5.5Zm-1.379-6.707c.391,.391,.391,1.023,0,1.414l-2.707,2.707c-.387,.387-.896,.582-1.405,.584l-.009,.002-.009-.002c-.509-.002-1.018-.197-1.405-.584l-2.707-2.707c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l1.707,1.707v-5c0-.553,.448-1,1-1s1,.447,1,1v5l1.707-1.707c.391-.391,1.023-.391,1.414,0Z" />
                            </svg>
                        </button>
                    </div>

                    <div className='w-full h-[100%] overflow-y-scroll'>
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2 text-left border border-gray-200 font-medium">Name</th>
                                    <th className="p-2 text-left border border-gray-200 font-medium">Email</th>
                                    <th className="p-2 text-left border border-gray-200 font-medium">Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="p-2 border border-gray-200">{item.name}</td>
                                    <td className="p-2 border border-gray-200">{item.email}</td>
                                    <td className="p-2 border border-gray-200">{item.contact}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
      </div>

    </div>
  )
}

export default Index