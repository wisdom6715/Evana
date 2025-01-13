import React from 'react'
import Image from 'next/image'
import SectionImage from './images/lastSectionImage.webp'
const LastSection = () => {
  return (
    <div style={{marginTop: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center', gap: '3rem'}}>
        <div>
            <h1 style={{fontSize: '3rem', fontWeight: 700, textAlign: 'center'}}>Trusted Partners, Proven <br />Results</h1>
            <p style={{textAlign: 'center'}}>Assign routine and repetitive tasks to digital employees. Integrating them is as simple <br />as working with your HR department</p>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
            <Image src={SectionImage} alt='last section image' style={{width: '100%', borderRadius: '1.5rem'}}/>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem'}}>
                    <p style={{fontSize: '3rem', fontWeight: 600}}>Join the AI revolution</p>
                    <p>Discover how IntuitionLabs can help your business unlock full potential of AI</p>
                </div>
                <button style={{backgroundColor: '#9c58ff', padding: '.5rem 2rem', color: 'white'}}>Get Started</button>
            </div>
        </div>
    </div>
  )
}

export default LastSection