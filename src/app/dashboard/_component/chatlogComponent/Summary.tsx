import React from 'react'
import LogRead from './LogRead'
import ChatlogList from './ChatlogList'
const Summary = () => {
  return (
    <div className='w-full bg-white flex justify-center items-center'>
        <div className='w-[90%] h-[95%] bg-white grid-rows-[4%_96%] grid gap-1'>
            <div className='bg-[#f1f1f3] flex items-center pl-2 border border-gray-200'>
                <h1>Chatlog Summary</h1>
            </div>
            <div className='bg-white border border-gray-200 grid-cols-[15%_85%] grid'>
                {/* chatlog Summary lists */}
                <div className='min-h-[50vh] max-h-[90vh] grid grid-rows-[4%_96%] '>
                    <ChatlogList />
                </div>

                {/* chatlog canva read space */}
                <div className='border border-l-[#c7c7c7]'>
                    <LogRead />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Summary