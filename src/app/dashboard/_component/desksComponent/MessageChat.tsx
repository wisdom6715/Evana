import React from 'react'
const MessageChat = () => {
  return (
    <>
        <div style={{width: '100%', height: '100%', display: 'grid', gridTemplateRows: '07% 86% 07%'}}>
            <div style={{display: 'flex', gap: '.5rem', flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingLeft: '.5rem'}}>
                <div style={{width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'grey', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem'}}>
                    <p>NE</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <p>Name</p>
                    <p>Email</p>
                </div>
            </div>
            <div style={{backgroundColor: '#F5F4F4', overflowY: 'scroll'}}>
                {/* Container for the messages */}

            </div>
            <div className='flex flex-col justify-center bg-red-800'>
                {/* conatiner for the input field */}
                <div className='grid grid-cols-[95%_5%] items-center bg-white h-[100%]'>
                    <input type="text" placeholder="Type a message..." className='w-[95%] outline-none h-[70%] pl-3 bg-white'/>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" id="arrow-circle-down" viewBox="0 0 24 24" width="30" height="30">
                            <path d="M12,24A12,12,0,1,0,0,12,12.013,12.013,0,0,0,12,24ZM6.293,9.465,9.879,5.879h0a3,3,0,0,1,4.243,0l3.585,3.586.024.025a1,1,0,1,1-1.438,1.389L13,7.586,13.007,18a1,1,0,0,1-2,0L11,7.587,7.707,10.879A1,1,0,1,1,6.293,9.465Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default MessageChat