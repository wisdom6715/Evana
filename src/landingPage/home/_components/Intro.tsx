import React from 'react'

const Intro = () => {
  return (
    <div style={{width: '70%', height:'70%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '4rem'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                <div>
                    <h1 style={{fontSize: '3.5rem', fontWeight: 700, }}>IntuitionLabs: Empowering businesses with AI</h1>
                    <p>with AI Employee Supporting Your Team 24/7</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '.5rem'}}>
                    <p style={{fontSize: '1rem'}}>Transform your business with IntuitionLabs' AI employees—streamline tasks, boost productivity, and deliver exceptional customer experiences. Start your journey now</p>
                    <p>Stay ahead in the AI revolution with CortexLab’s trusted AI solutions enhancing your business capabilities.</p>
                    <p>Stay ahead in the AI revolution with CortexLab’s trusted AI solutions enhancing your business capabilities.</p>  
                </div>
            </div>
            <div>
                <button style={{padding: '.5rem 2rem', backgroundColor: 'black', color: 'white'}}>Get Started</button>
            </div>
        </div>
    </div>
  )
}

export default Intro