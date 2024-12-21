import React from 'react'
import Profile from '@/design-system/form/Profile'
import Customize from '@/design-system/form/Customize'

const index = () => {
  return (
    <>
      <div style={{width: "100%", backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{display: 'grid', gridTemplateColumns: '15% 85%', width: '80%', backgroundColor: 'white', height: '80%', borderStyle: "solid", borderWidth: '1px', borderColor: 'grey'}}>
          <div style={{backgroundColor: 'white', display: 'flex', alignItems: 'center', gap: 20, flexDirection: 'column', paddingTop: '1rem',borderStyle: "solid", borderRightWidth: '1px', borderColor: 'grey'}}>
            <h2>Account settings</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
              <p>Company's Profile</p>
              <p>Customize Chatbot</p>
              <p>Help Desks</p>
              <p>Payment Method</p>
              <p>Subscription Method</p>
              <p>Payment Method</p>
              <p>Privacy</p>
            </div>
          </div>

          <div style={{backgroundColor: 'white', width: '100%'}}>
            {/* <Profile /> */}
            <Customize />
          </div>
        </div>
        
      </div>
    </>
  )
}

export default index