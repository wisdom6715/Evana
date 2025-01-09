import React from 'react'
import LogRead from './LogRead'
import ChatlogList from './ChatlogList'
const Summary = () => {
  return (
    <div className='w-full bg-red-50 flex justify-center items-center'>
        <div className='w-[90%] h-[95%] bg-black grid-rows-[5%_95%] grid'>
            <div className='bg-white flex items-center pl-2'>
                <h1>Chatlog Summary</h1>
            </div>
            <div className=' bg-gray-200 grid-cols-[15%_85%] grid'>
                {/* chatlog Summary lists */}
                <div className='min-h-[50vh] max-h-[90vh] p-2 grid grid-rows-[4%_96%] '>
                    <ChatlogList />
                </div>

                {/* chatlog canva read space */}
                <div className='bg-gray-100 pl-10 pr-10'>
                    <LogRead />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Summary