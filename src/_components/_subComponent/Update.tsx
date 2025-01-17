import React from 'react'

const Update = () => {
  return (
        <div style={{display: 'flex', flexDirection: 'column', height: '70%',}}>
            <div style={{height: '80%', width: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h2>Broadcast Message</h2>
                    <button style={{backgroundColor: 'black', color: 'white', padding: '.2rem .3rem'}}>Broadcast</button>
                </div>
                <div style={{width: '100%', display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', marginTop: '1rem', justifyContent: 'center'}}>
                    <div style={{width: '80%', border: '.1rem dashed grey', height: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <input style={{display: 'none'}} type="file" />
                        <p>Upload Media</p>
                    </div>
                </div>
            </div>
            <div style={{height: '20%', width: '100%'}}>
                <textarea placeholder='Enter message to broadcast.......' name="" id="" style={{width: '100%', height: '80%', backgroundColor: '#d0d4d2', paddingLeft: '.5rem'}}></textarea>
            </div>
        </div>
  )
}

export default Update