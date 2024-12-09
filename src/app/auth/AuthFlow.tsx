'use client'
import React from 'react'
import Image from 'next/image'
import googleLogo from '@/app/assets/images/google.jpeg'
import microsoftLogo from '@/app/assets/images/microsoft.jpeg'
import useAuth from '@/services/useAuth'
import useThirdpartyAuth from '@/services/useThirdpartyAuth'
const AuthFlow = () => {
    const {  isLoading, userInfo, handleAuth, handleInputChange } = useAuth()
    const { handleGoogleSignIn, handleMicrosoftSignin } = useThirdpartyAuth()
    const handleSubmision = (e: any) => {
        e.preventDefault();        
    }
  return (
    <div className='flex flex-row h-[100vh] items-center justify-center'>
        <div className="w-1/2 bg-blue-500 h-[90vh] text-white flex items-center justify-center rounded-tr-[20px] rounded-br-[20px]">
            Graphical Introduction Container
        </div>
        <div className='w-1/2 h-[90vh] text-white flex items-center justify-center flex-col gap-10'>
            <h1 className='text-black text-lg font-bold bg-gray-200'>KustomAI</h1>
            <div className='flex flex-col gap-10'>

                <div className='text-black flex flex-col items-center justify-center'>
                    <h1 className='text-black font-bold text-lg'>Welcome Back!</h1>
                    <h2>Sign up or log in by entering your email below</h2>
                </div>

                <div className='text-black text-sm flex flex-col items-center gap-10'>
                    <div className='flex items-center w-50 h-10 gap-5 bg-gray-200' onClick={handleGoogleSignIn}>
                        <Image 
                            className='w-5 h-5'
                            alt='google logo'
                            src={googleLogo}
                        />
                        <p>Continue with Google</p>
                    </div>
                    <div className='flex items-center w-50 h-10 gap-5 bg-gray-200' onClick={handleMicrosoftSignin}>
                        <Image 
                            className='w-5 h-5'
                            alt='microsoft logo'
                            src={microsoftLogo}
                        />
                        <p>Continue with Microsoft</p>
                    </div>
                </div>

                <form className='flex flex-col gap-10' onSubmit={handleSubmision}>
                    <input type="text" 
                    placeholder="Email" 
                    className='bg-gray-200 '
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    value={userInfo.email}
                    required
                    />
                    <input type="password" 
                    placeholder="Password" 
                    className='bg-gray-200'
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    value={userInfo.password}
                    required
                    />
                    <button  className='text-white w-50 h-10 bg-black' onClick={handleAuth}>Continue</button>
                </form>
                <p className='text-black text-sm'>
                    By continuing you agree to KustomAI Terms of service Privacy Policies
                </p>
            </div>
        </div>
    </div>
  )
}

export default AuthFlow