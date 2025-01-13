import React from 'react'
import Logo from '@/app/assets/images/Screenshot 2025-01-11 090739.png'
import Image from 'next/image'
import Link from 'next/link'
const Footer = () => {
  return (
    <div style={{marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '3rem'}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', width: '100%', height: '9rem', gap: '2rem'}}>
            <div>
                <Image  src={Logo} alt='logo' style={{width: '10rem'}}/>
                <p>@2025 intuitionlabs <br /> all right reserved</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <p>Quick Links</p>
                <Link href='/'>Home</Link>
                <Link href='/'>Products</Link>
                <Link href='/landingPage/cost'>Pricing</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <p>Our Solutions</p>
                <p>Virtual Assistant</p>
                <p>Customer Support</p>
                <p>Appointment Scheduler</p>
                <p>Sales Assistant</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <p>Connect with us</p>
                <Link href='/'>Facebook</Link>
                <Link href='/'>X</Link>
                <Link href='/'>Linkedin</Link>
                <Link href='/'>Instagram</Link>
            </div>
        </div>
    </div>
  )
}

export default Footer