import React, { useState } from 'react'

const MeetAI = () => {
    const [ishover, setHoverIndex] = useState <number | null>(null)
    const Employees = [
        {
            role: 'Virtual Assistant',
            description: 'AI expert with expertise in virtual assistants and AI-powered customer support.',
            image: ''
        },
        {
            role: 'Customer Support',
            description: 'Meet your AI-powered Customer Support Assistant—ready to handle inquiries, resolve issues, and provide fast, efficient service 24/7.',
            image: ''
        },
        {
            role: 'Sales Assistant',
            description: 'AI-powered Sales Assistant—automating tasks, managing leads, and providing insights to help you close more deals, faster.',
            image: ''
        },
        {
            
           role: 'Appointments Manager',
            description: 'AI-powered Appointment Manager—automating scheduling, reminders, and rescheduling to keep your calendar organized and stress-free across platforms',
            image: ''
        }
    ]
  return (
    <div className="flex flex-col w-full mt-16 gap-12">
        <div className="flex flex-col items-center text-center w-full">
            <h1 className="text-[2rem] md:text-[3rem] font-bold">Meet Our AI Employees</h1>
            <p className="w-[70%]">Discover the diverse AI employees transforming business operations, from virtual assistants optimizing administrative tasks to advanced sales assistant uncovering valuable insights</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
            Employees.map((employee, index) => (
                <div
                key={index}
                className={`flex flex-col text-l items-center gap-8 p-4 rounded-xl border  ${ishover === index ? 'border-[#cb8bfa]' : 'border-none'}`}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                >
                <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-32 h-32 bg-red-500 rounded-full border-4 border-blue-500"></div>
                    <h2>{employee.role}</h2>
                </div>
                <p className="text-center">{employee.description}</p>
                </div>
            ))
            }
        </div>

        <div className="flex flex-col items-center w-full">
            <button className="py-2 px-8 bg-black text-white rounded hover:bg-[#9c58ff]">Get Started</button>
        </div>
    </div>
  )
}

export default MeetAI