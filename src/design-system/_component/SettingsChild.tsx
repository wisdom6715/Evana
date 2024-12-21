import React from 'react'

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
           <form action="" style={{display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem'}}>

              <div>
                <p>Company's Name</p>
                <input type="text" style={{backgroundColor: 'grey', width: '70%', height: '2.5rem'}}/>
              </div>

              <div>
                <p>Company's Email</p>
                <input type="text" style={{backgroundColor: 'grey', width: '70%', height: '2.5rem'}}/>
              </div>

              <div>
                <p>Website url</p>
                <input type="text" style={{backgroundColor: 'grey', width: '70%', height: '2.5rem'}}/>
              </div>

              <div>
                <p>password</p>
                <input type="text" style={{backgroundColor: 'grey', width: '70%', height: '2.5rem'}}/>
              </div>
              <div>
                <button style={{backgroundColor: 'black', color: 'white', padding: '.7rem'}}>Save and Continue</button>
              </div>
           </form>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default index