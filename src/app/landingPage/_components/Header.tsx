'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Logo from "@/app/assets/images/new.png"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="relative w-full">
      {/* Main Header */}
      <div className="flex items-center justify-between py-4">
        {/* Logo */}
        <Image 
          onClick={() => router.push('/')} 
          src={Logo} 
          alt='intuitionlabs logo' 
          className="cursor-pointer w-auto h-8 md:h-20"
        />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8  text-l font-bold">
          <Link href='/' className="hover:text-gray-400 transition-colors">
            Home
          </Link>
          <Link href='/landingPage/products' className="hover:text-gray-400 transition-colors">
            Products
          </Link>
          <Link href='/landingPage/cost' className="hover:text-gray-400 transition-colors">
            Pricing
          </Link>
        </div>

        {/* Desktop CTA Button */}
        <button className="hidden md:block px-8 py-2 bg-black text-white hover:bg-[#9c58ff] transition-colors duration-300 rounded">
          Get Started
        </button>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              // X icon when menu is open
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              // Hamburger icon when menu is closed
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`
        md:hidden 
        absolute 
        top-full 
        left-0 
        right-0 
        bg-white 
        shadow-lg 
        transition-all 
        duration-300 
        ease-in-out
        ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}
      `}>
        <div className="flex flex-col gap-4 p-4">
          <Link 
            href='/' 
            className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href='/landingPage/products' 
            className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link 
            href='/landingPage/cost' 
            className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <button className="w-full px-8 py-2 bg-black text-white hover:bg-gray-800 transition-colors rounded-md">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header