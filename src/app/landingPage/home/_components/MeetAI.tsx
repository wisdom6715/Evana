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
    <div style={{display: 'flex', flexDirection: 'column', width: '100%', marginTop: '4rem', gap: '3rem'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems:'center', textAlign: 'center', width: '100%'}}>
            <h1 style={{fontSize: '2.5rem', fontWeight: 700}}>Meet Our AI Employees</h1>
            <p style={{width: '70%'}}>Explore the diverse types of AI Employees shaping the future of business operations from virtual assistants streamlining administrative tasks to advanced data analysts uncovering valuable insights.</p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr'}}>
            {
                Employees.map((employee, index) => (
                    <div key={index} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '1rem', borderRadius: '1rem', border: ishover === index? '.1rem solid grey' : 'none'}} onMouseEnter={()=> setHoverIndex(index)} onMouseLeave={()=> setHoverIndex(null)}>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '.5rem'}}>
                            <div style={{width: '8rem', height: '8rem', backgroundColor: 'red', borderRadius: '50%', border: '.3rem solid blue'}}></div>
                            <h2>{employee.role}</h2>
                        </div>
                        <p style={{textAlign: 'center'}}>{employee.description}</p>
                    </div>
                ))
            }
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems:'center', width: '100%'}}>
            <button style={{padding: '.5rem 2rem', backgroundColor: 'black', color: 'white'}}>Get Started</button>
        </div>
    </div>
  )
}

export default MeetAI