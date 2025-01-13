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
            role: 'Data Analyst',
            description: 'Expert in data analysis, machine learning, and predictive modeling, helping businesses make data-driven decisions.',
            image: ''
        },
        {
            role: 'Product Manager',
            description: 'Leading the product development team, managing the development of innovative AI solutions and technologies.',
            image: ''
        },
        {
            
           role: 'Software Engineer',
            description: 'Experienced software engineer with expertise in building AI-powered applications and systems.',
            image: ''
        }
    ]
  return (
    <div className="flex flex-col w-full mt-16 gap-12">
        <div className="flex flex-col items-center text-center w-full">
            <h1 className="text-[2rem] md:text-[3rem] font-bold">Meet Our AI Employees</h1>
            <p className="w-7/10">Explore the diverse types of AI Employees shaping the future of business operations from virtual assistants streamlining administrative tasks to advanced data analysts uncovering valuable insights.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
            Employees.map((employee, index) => (
                <div
                key={index}
                className={`flex flex-col items-center gap-8 p-4 rounded-xl border ${ishover === index ? 'border-grey-500' : 'border-none'}`}
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
            <button className="py-2 px-8 bg-black text-white">Get Started</button>
        </div>
    </div>
  )
}

export default MeetAI