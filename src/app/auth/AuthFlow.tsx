'use client'
import React from 'react'
import Image from 'next/image'
import googleLogo from '@/app/assets/images/google.jpeg'
import microsoftLogo from '@/app/assets/images/microsoft.jpeg'
import useAuth from '@/services/useAuth'
import useThirdpartyAuth from '@/services/useThirdpartyAuth'
import Link from 'next/link'
const AuthFlow = () => {
    const {  isLoading, userInfo, handleAuth, handleInputChange } = useAuth()
    const { handleGoogleSignIn, handleMicrosoftSignin } = useThirdpartyAuth()
    const handleSubmision = (e: any) => {
        e.preventDefault();        
    }
  return (
    <div className='flex flex-row h-[100vh] items-center justify-center'>
        <div className="w-1/2 bg-gray-200 h-[90vh] text-white flex items-center justify-center rounded-tr-[20px] rounded-br-[20px]">
            Graphical Introduction Container
        </div>
        <div className='w-1/2 h-[90vh] text-white flex items-center justify-center flex-col gap-[60px]'>
            <h1 className='text-black text-lg font-bold bg-gray-200 text-[30px]'>KustomAI</h1>
            <div className='flex flex-col gap-[30px]'>

                <div className='text-black flex flex-col items-center justify-center'>
                    <h1 className='text-black font-bold text-lg text'>Welcome Back!</h1>
                    <h2>Sign up or log in by entering your email below</h2>
                </div>

                <div className='text-black text-sm flex flex-col items-center gap-[14px]'>
                    <div className='flex items-center w-[434px] h-[54px] gap-5 bg-white-200 justify-center rounded-lg border border-[C3C3C3]-200' onClick={handleGoogleSignIn}>
                        <Image 
                            className='w-5 h-5'
                            alt='google logo'
                            src={googleLogo}
                        />
                        <p>Continue with Google</p>
                    </div>
                    <div className='flex items-center w-[434px] h-[54px] gap-5 bg-white-200 justify-center rounded-lg border border-[C3C3C3]-200' onClick={handleMicrosoftSignin}>
                        <Image 
                            className='w-5 h-5'
                            alt='microsoft logo'
                            src={microsoftLogo}
                        />
                        <p>Continue with Microsoft</p>
                    </div>
                </div>
                {/* <div>
                    <div></div>
                    <p>Or</p>
                    <div></div>
                </div> */}
                <form className='flex flex-col gap-[14px]' onSubmit={handleSubmision}>
                    <input type="text" 
                    placeholder="Email" 
                    className='bg-gray-200 h-[54px] pl-5 rounded-lg'
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    value={userInfo.email}
                    required
                    />
                    <input type="password" 
                    placeholder="Password" 
                    className='bg-gray-200 h-[54px] pl-5 rounded-lg'
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    value={userInfo.password}
                    required
                    />
                    <button  className='text-white w-[434px] h-[54px] bg-black rounded-lg' onClick={handleAuth}>Continue</button>

                    <p className='text-black text-sm'>
                        By continuing you agree to KustomAI <Link href ={'/'} >Terms of Service</Link> <Link href={'/'}>Privacy Policies</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AuthFlow