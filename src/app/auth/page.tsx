'use client'
import React, { FormEvent } from 'react'
import Image from 'next/image'
import googleLogo from '@/app/assets/images/google.jpeg'
import microsoftLogo from '@/app/assets/images/microsoft.jpeg'
import useAuth from '@/services/useAuth'
import useThirdpartyAuth from '@/services/useThirdpartyAuth'
import Link from 'next/link'
import Logo from '@/app/assets/images/newLogo.png'
import AuthImage from '@/app/landingPage/home/_components/images/lastSectionImage.webp'

const AuthFlow = () => {
    const { userInfo, handleAuth, handleInputChange } = useAuth()
    const { handleGoogleSignIn, handleMicrosoftSignin } = useThirdpartyAuth()
    
    const handleSubmission = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add any additional submission logic here if needed
    }

    return (
        <div className='flex flex-col lg:flex-row min-h-screen w-full items-center justify-center bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
            <Image 
                src={AuthImage} 
                alt='auth image' 
                className="hidden lg:block w-1/2 h-[90vh] object-cover rounded-tr-[1.5rem] rounded-br-[1.5rem]"
                priority
            />
            
            <div className='w-full px-4 sm:px-6 lg:w-1/2 py-8 lg:py-0 flex items-center justify-center flex-col'>
                <Image 
                    src={Logo} 
                    alt='Intuitionlabs Logo' 
                    className='w-48 sm:w-56 lg:w-72 h-auto mb-8'
                    priority
                />
                
                <div className='flex flex-col gap-6 w-full max-w-md'>
                    <div className='text-black text-center space-y-2'>
                        <h1 className='text-2xl sm:text-3xl font-semibold'>Welcome Back!</h1>
                        <h2 className='text-sm sm:text-base'>Sign up or log in by entering your email and password below</h2>
                    </div>

                    <div className='w-full space-y-4'>
                        <button 
                            className='flex items-center w-full h-12 sm:h-14 gap-3 bg-white justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200'
                            onClick={handleGoogleSignIn}
                        >
                            <Image 
                                className='w-6 h-6 sm:w-7 sm:h-7'
                                alt='google logo'
                                src={googleLogo}
                            />
                            <span className='text-sm sm:text-base'>Continue with Google</span>
                        </button>
                        
                        <button 
                            className='flex items-center w-full h-12 sm:h-14 gap-3 bg-white justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200'
                            onClick={handleMicrosoftSignin}
                        >
                            <Image 
                                className='w-6 h-6 sm:w-7 sm:h-7'
                                alt='microsoft logo'
                                src={microsoftLogo}
                            />
                            <span className='text-sm sm:text-base'>Continue with Microsoft</span>
                        </button>
                    </div>

                    <form className='space-y-4 w-full' onSubmit={handleSubmission}>
                        <input 
                            type="text" 
                            placeholder="Email.........." 
                            className='bg-gray-200 w-full h-12 sm:h-14 px-4 rounded-lg outline-none focus:ring-2 focus:ring-black transition-shadow'
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            value={userInfo.email}
                            required
                        />
                        <input 
                            type="password" 
                            placeholder="Password......." 
                            className='bg-gray-200 w-full h-12 sm:h-14 px-4 rounded-lg outline-none focus:ring-2 focus:ring-black transition-shadow'
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            value={userInfo.password}
                            required
                        />
                        <button 
                            type="submit"
                            className='text-white w-full h-12 sm:h-14 bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200'
                            onClick={handleAuth}
                        >
                            Continue
                        </button>
                        <p className="text-black text-xs sm:text-sm text-center">
                            By continuing you agree to IntuitionLabs{' '}
                            <Link href={'/'} className="underline hover:text-gray-600">Terms of Service</Link>{' '}
                            <Link href={'/'} className="underline hover:text-gray-600">Privacy Policies</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthFlow