import React from 'react'

const ChatlogList = () => {
  return (
    <>
      <p className='p-2 w-[100%] bg-[#f1f1f3]'>Weekly chats Summary</p>
      <ul className='bg-white flex flex-col p-2 gap-2 overflow-y-scroll'>
        <li className='bg-[#f1f1f3] pt-2 pb-2'>Jan: Week 1</li>
      </ul>
    </>
  )
}

export default ChatlogList