import React from 'react'
import Image from 'next/image'
import Support from '@/app/landingPage/home/_components/images/support.webp'
const HumanSupport = () => {
  return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', marginTop: '4rem', gap: '3rem'}}>
        <Image src={Support} alt='customer support with bot'/>
        <div style={{backgroundColor: 'white', width: '90%', display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '3rem'}}>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '.5rem'}}>
                <p style={{color: 'greenyellow', fontSize: '1.2rem'}}>Empower your team with AI</p>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem'}}>
                    <h1 style={{fontSize: '3rem', fontWeight: 700, }}>Enhance Customer experience with</h1>
                    <p style={{fontSize: '1.2rem', fontWeight: 400, }}>IntuitionLabs AI powered solution are designed to streamlined your business operation and elevate customers </p>
                </div>
            </div>
            <div>
                <button style={{padding: '.5rem 2rem', backgroundColor: 'black', color: 'white'}}>Get Started</button>
            </div>
        </div>
    </div>
  )
}

export default HumanSupport