import React, { useState } from 'react'
import Image from 'next/image'
import avatar1 from '../../_components/assets/images/avatar1.jpeg'
import avatar2 from '../../_components/assets/images/avatar2.jpeg'
import avatar3 from '../../_components/assets/images/avatar5.jpg'
import avatar4 from '../../_components/assets/images/avatar4.webp'
const MeetAI = () => {
    const [ishover, setHoverIndex] = useState <number | null>(null)
    const Employees = [
        {
            role: 'Virtual Assistant',
            description: 'AI expert with expertise in virtual assistants and AI-powered customer support.',
            image: avatar4
        },
        {
            role: 'Customer Support',
            description: 'Meet your AI-powered Customer Support Assistant—ready to handle inquiries, resolve issues, and provide fast, efficient service 24/7.',
            image: avatar3
        },
        {
            role: 'Sales Assistant',
            description: 'AI-powered Sales Assistant—automating tasks, managing leads, and providing insights to help you close more deals, faster.',
            image: avatar2
        },
        {
            
           role: 'Appointments Manager',
            description: 'AI-powered Appointment Manager—automating scheduling, reminders to keep your calendar organized and stress-free across platforms',
            image: avatar1
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
                className={`flex flex-col text-l items-center gap-8 p-2 rounded-xl border ${ishover === index ? 'border-[#cb8bfa]' : 'border-none'} transition duration-700 ease-in-out`}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                >
                <div className="flex flex-col items-center text-center gap-2">
                    <Image src={employee.image} className="w-32 h-32 bg-red-500 rounded-full border-4 border-[#a3eaf3] object-cover" alt={employee.role}/>
                    <h2>{employee.role}</h2>
                </div>
                <p className="text-center">{employee.description}</p>
                </div>
            ))
            }
        </div>
    </div>
  )
}

export default MeetAI