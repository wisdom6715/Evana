'use client'
import React, { FormEvent } from 'react'
import Image from 'next/image'
import googleLogo from '@/app/assets/images/google.jpeg'
import microsoftLogo from '@/app/assets/images/microsoft.jpeg'
import useAuth from '@/services/useAuth'
import useThirdpartyAuth from '@/services/useThirdpartyAuth'
import Link from 'next/link'
import Logo from '@/app/assets/images/newLogo.png'

const AuthFlow = () => {
    const { userInfo, handleAuth, handleInputChange } = useAuth()
    const { handleGoogleSignIn, handleMicrosoftSignin } = useThirdpartyAuth()
    
    const handleSubmission = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add any additional submission logic here if needed
    }

    return (
        <div className='flex flex-row h-[100vh] items-center justify-center'>
            <div className="w-1/2 bg-gray-200 h-[90vh] text-white flex items-center justify-center rounded-tr-[20px] rounded-br-[20px]">
                Graphical Introduction Container
            </div>
            <div className='w-1/2 h-[90vh] text-white flex items-center justify-center flex-col'>
                <Image src={Logo} alt='Intuitionlabs Logo' className='w-72 h-28'/>
                <div className='flex flex-col gap-[30px] items-center'>
                    <div className='text-black flex flex-col items-center justify-center gap-2 w-[90%]'>
                        <h1 className='text-black font-bold text-lg text-[2.5rem]'>Welcome Back!</h1>
                        <h2 className='text-center'>Sign up or log in by entering your email and password below</h2>
                    </div>

                    <div className='w-[90%] text-black text-sm flex flex-col items-center gap-[14px]'>
                        <div 
                            className='flex items-center w-[100%] h-[54px] gap-5 bg-white-200 justify-center rounded-lg border border-[C3C3C3]-200 cursor-pointer' 
                            onClick={handleGoogleSignIn}
                        >
                            <Image 
                                className='w-7 h-7'
                                alt='google logo'
                                src={googleLogo}
                            />
                            <p>Continue with Google</p>
                        </div>
                        <div 
                            className='flex items-center w-[100%] h-[54px] gap-5 bg-white-200 justify-center rounded-lg border border-[C3C3C3]-200 cursor-pointer' 
                            onClick={handleMicrosoftSignin}
                        >
                            <Image 
                                className='w-7 h-7'
                                alt='microsoft logo'
                                src={microsoftLogo}
                            />
                            <p>Continue with Microsoft</p>
                        </div>
                    </div>

                    <form className='flex flex-col gap-[14px] items-center w-[90%]' onSubmit={handleSubmission}>
                        <input 
                            type="text" 
                            placeholder="Email" 
                            className='bg-gray-200 w-[100%] h-[54px] pl-5 rounded-lg'
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            value={userInfo.email}
                            required
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className='bg-gray-200 w-[100%] h-[54px] pl-5 rounded-lg'
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            value={userInfo.password}
                            required
                        />
                        <button 
                            type="submit"
                            className='text-white w-[100%] h-[54px] bg-black rounded-lg'
                            onClick={handleAuth}
                        >
                            Continue
                        </button>
                        <div className='w-[100%] items-center flex-row'>
                            <p className="text-black text-sm break-words text-center">
                                By continuing you agree to IntuitionLabs <Link href={'/'}>Terms of Service</Link> <Link href={'/'}>Privacy Policies</Link>
                            </p>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export default AuthFlow