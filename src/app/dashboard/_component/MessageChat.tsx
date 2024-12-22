import React from 'react'
const MessageChat = () => {
  return (
    <>
        <div style={{width: '100%', height: '100%', display: 'grid', gridTemplateRows: '07% 86% 05%'}}>
            <div style={{display: 'flex', gap: '.5rem', flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingLeft: '.5rem'}}>
                <div style={{width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'grey', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem'}}>
                    <p>NE</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <p>Name</p>
                    <p>Email</p>
                </div>
            </div>
            <div style={{backgroundColor: '#F5F4F4'}}>
                {/* Container for the messages */}

            </div>
            <div style={{backgroundColor: 'white'}}>
                {/* conatiner for the input field */}
            </div>
        </div>
    </>
  )
}

export default MessageChat