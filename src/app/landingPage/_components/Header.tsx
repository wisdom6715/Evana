import React from 'react'
import Image from 'next/image'
import Logo from "@/app/assets/images/new.png"
import Link from 'next/link'
const Intro = () => {
  return (
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Image src={Logo} alt='intuitionlabs logo'/>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
            <Link href='/'>Home</Link>
            <Link href='/'>Products</Link>
            <Link href='/landingPage/cost'>Pricing</Link>
        </div>
        <button style={{padding: '.5rem 2rem', backgroundColor: 'black', color: 'white'}}>Get Started</button>
    </div>
  )
}

export default Intro