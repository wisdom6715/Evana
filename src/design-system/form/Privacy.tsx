import React, {useState} from 'react'
const Privacy = () => {
  const [checked, isChecked] = useState(true)
  return (
    <div>
      <div style={{width: '100%', height: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', borderBottom: '.1rem solid grey'}}>
        <h1>Privacy</h1>
        <p>Modify your Privacy settings here</p>
      </div>

      <form style={{display: 'flex', flexDirection: 'column', padding: '2rem', gap: '1rem'}}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '.5rem' }}>
          <input onChange={()=> isChecked(!checked)} type="checkbox" style={{backgroundColor: checked ? 'black' : 'white', border: '.1rem solid black', cursor: 'pointer', width: '1rem', height: '1rem', fill: 'black', appearance: 'none'}}/>
          <p>Enable Notifications</p>
        </div>

        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '.5rem' }}>
          <input type="checkbox" style={{backgroundColor: checked?  'black' : 'white', width: '1rem', height: '1rem', border: '.1rem solid black', cursor: 'pointer', fill: 'black', appearance: 'none'}}/>
          <p>Enable Email Updates</p>
        </div>
        <button style={{width: '6rem', backgroundColor: 'black', color: 'white', height: '2rem', padding: '0 1rem'}}>Save</button>
      </form>
    </div>
  )
}

export default Privacy