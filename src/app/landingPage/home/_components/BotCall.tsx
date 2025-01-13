import React from 'react'
import Image from 'next/image'
import BotImage from './images/Bot.webp'

const BotCall = () => {
  return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '4rem', width: '100%'}}>
        <Image src={BotImage} alt='Bot image' style={{backgroundColor: 'red'}}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center'}}>
          <div>
            <p>Join the AI Revolution</p>
            <h1 style={{fontSize: '3rem', fontWeight: 700}}>Empower Businesses with</h1>
            <p style={{fontSize: '1.2rem', fontWeight: 400, }}>at intuitionlabswe are commited to empowering businesses with latest AI technology . Our team of experts work tirelessly to develop innovative solutions</p>
          </div>

          <div >
            <button style={{padding: '.5rem 2rem', backgroundColor: 'black', color: 'white'}}>Get Started</button>
          </div>
        </div>
    </div>
  )
}

export default BotCall