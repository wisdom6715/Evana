import React from 'react'

const MessageItem = () => {
  return (
    <>
        <div style={{width: '100%', height: '4rem',  display: 'flex', justifyContent: 'space-between', backgroundColor: '#F4F4F4', alignItems: 'center', padding: '0rem 1rem'}}>
            <div style={{display: 'flex', gap: '.5rem', flexDirection: 'row', alignItems: 'center'}}>
                <div style={{width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'grey', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem'}}>
                    <p>NE</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <p>Name</p>
                    <p>Email</p>
                </div>
            </div>
            <p>date</p>
        </div>
    </>
  )
}

export default MessageItem