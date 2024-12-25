'use client'
import { useRouter } from 'next/navigation'
const WelcomePage = () => {
    const router = useRouter()
  return (
    <div className='flex flex-col items-center justify-center w-[100%] h-[100vh] bg-white'>
        <div className='position: absolute left-5 top-5'>
            <h1 className='text-bold text-[30px] '>KustomAI</h1>
        </div>
        <div className='flex flex-col items-center justify-center gap-10'>
            <div className='flex flex-col items-center justify-center w-[45%] text-center'>
                <h1 className='text-bold text-[30px] '>Welcome to KustomAI!</h1>
                <h2 className='text-[15px] text-bold'>Ready to supercharge your team’s productivity? To unlock the platform, you’ll nee d to subscribe to a plan and try it free for 7 days</h2>
            </div>
            <div className='w-[222px] h-[48px] bg-[#F9F5F5] flex flex-row justify-between items-center pl-5 rounded-[20px] text-bold cursor-pointer' onClick={() => router.push('/pricing')}>
                <p>Subscribe Now</p>
                <div className='w-[48px] h-[48px] rounded-full bg-black items-center flex justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="24" height="24" fill='white'>
                        <path d="M23.12,9.91,19.25,6a1,1,0,0,0-1.42,0h0a1,1,0,0,0,0,1.41L21.39,11H1a1,1,0,0,0-1,1H0a1,1,0,0,0,1,1H21.45l-3.62,3.61a1,1,0,0,0,0,1.42h0a1,1,0,0,0,1.42,0l3.87-3.88A3,3,0,0,0,23.12,9.91Z"/>
                    </svg>
                </div>
            </div>
        </div>

    </div>
  )
}
export default WelcomePage