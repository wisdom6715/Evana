import React, {useState} from 'react'
import Customize from '@/design-system/form/Customize'
import Profile from '../form/Profile'
import HelpDesk from '../form/HelpDesk'
import Privacy from '../form/Privacy'
type navProperties = {
  title: string
  plan?: string
}
const index = () => {
  const [activeComponent, setActiveComponent] = useState<string>('Company Profile')
  const navProperties =[
    {
      title: 'Company Profile'
    },
    {
      title: 'Customize chatbot'
    },
    {
      title: 'Integration'
    },
    {
      title: 'Help Desks',
      plan: 'advanced'
    },
    {
      title: 'Chat logs'
    },
    {
      title: 'Subscription Details'
    },
    {
      title: 'Privacy'
    }
  ]
  const handleNavigation = (title: string) => {
    console.log('Navigation triggered', title);
    setActiveComponent(title); // Update the active component based on the selected title
  };
  const renderComponent = () => {
    switch(activeComponent){
      case 'Company Profile':
        return <Profile />
      case 'Customize chatbot':
        return <Customize />
      case 'Privacy':
        return <Privacy />
      case 'Help Desks':
        return <HelpDesk />
      default:
        return <Profile />
    }
  }
  return (
    <>
      <div style={{width: "100%", backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{display: 'grid', gridTemplateColumns: '15% 85%', width: '80%', backgroundColor: 'white', height: '80%', borderStyle: "solid", borderWidth: '1px', borderColor: 'grey'}}>
          <div style={{backgroundColor: 'white', display: 'flex', alignItems: 'center', gap: 20, flexDirection: 'column', paddingTop: '1rem',borderStyle: "solid", borderRightWidth: '1px', borderColor: 'grey'}}>
            <h2>Account settings</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
            {
              navProperties.map((nav, index) => (
                <div key={index} style={{display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'flex-start', borderStyle: "solid", borderWidth: '1px', borderColor: 'grey', padding: 10, cursor: 'pointer'}}>
                  <h3 onClick={() => handleNavigation(nav.title)}>{nav.title}</h3>
                </div>
              ))
            }
            </div>
          </div>

          <div style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
            {renderComponent()}
          </div>
        </div>
      </div>
    </>
  )
}

export default index