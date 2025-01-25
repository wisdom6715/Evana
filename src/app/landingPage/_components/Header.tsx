'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Logo from "@/app/assets/images/LatestLogo.png";
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Get current route
import { useRouter } from 'next/navigation'

const Header = () => {
  const pathname = usePathname(); // Get the current route
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter()
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative w-full">
      {/* Main Header */}
      <div className="flex items-center justify-between py-4">
        {/* Logo */}
        <Image
          onClick={() => router.push('/')}
          src={Logo}
          alt="intuitionlabs logo"
          className="cursor-pointer w-36 md:w-60 h-auto md:h-24"
        />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-l font-bold">
          {/* Home Link */}
          <Link
            href="/landingPage/home"
            className="relative group text-gray-800"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-black">
              Home
            </span>
            <span
              className={`absolute bottom-[-5px] left-0 h-[4px] bg-gradient-to-r from-[#e498fc] to-[#fbf1ff] transition-all duration-500 ${
                pathname === '/landingPage/home'
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </Link>

          {/* Products Link */}
          <Link
            href="/landingPage/products"
            className="relative group text-gray-800"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-black">
              Products
            </span>
            <span
              className={`absolute bottom-[-5px] left-0 h-[4px] bg-gradient-to-r  from-[#e498fc] to-[#fbf1ff]ansition-all duration-500 ${
                pathname === '/landingPage/products'
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </Link>

          {/* Pricing Link */}
          <Link
            href="/landingPage/cost"
            className="relative group text-gray-800"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-black">
              Pricing
            </span>
            <span
              className={`absolute bottom-[-5px] left-0 h-[4px] bg-gradient-to-r from-[#e498fc] to-[#fbf1ff] transition-all duration-500 ${
                pathname === '/landingPage/cost'
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </Link>
        </div>

        {/* Desktop CTA Button */}
        <button
          className="hidden md:block px-8 py-2 bg-black text-white hover:bg-[#9c58ff] transition-colors duration-300 rounded"
          onClick={() => router.push('/auth')}
        >
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
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="flex flex-col gap-4 p-4">
          <Link
            href="/"
            className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/landingPage/products"
            className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/landingPage/cost"
            className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <button
            className="w-full px-8 py-2 bg-black text-white hover:bg-[#9c58ff] transition-colors rounded-md"
            onClick={() => router.push('/auth')}
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
