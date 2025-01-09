import React from 'react'

const ChatlogList = () => {
  return (
    <>
      <p>Weekly chats Summary</p>
      <ul className='bg-gray-200 flex flex-col gap-2 overflow-y-scroll'>
        <li className='bg-slate-300 pt-2 pb-2'>Monday: 15:00 - 17:00</li>
      </ul>
    </>
  )
}

export default ChatlogList