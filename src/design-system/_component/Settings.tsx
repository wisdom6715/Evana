import React, {useState} from 'react'
import Customize from '@/design-system/form/Customize'
import Profile from '../form/Profile'
import HelpDesk from '../form/HelpDesk'
import Privacy from '../form/Privacy'
import Integration from '../form/Integration'
import Subscription from '../form/Subscription'
type navProperties = {
  title: string
  plan?: string
}
const index = () => {
  const [activeComponent, setActiveComponent] = useState<string>('Company Profile')
  const navProperties: navProperties[] =[
    {
      title: 'Company Profile'
    },
    {
      title: 'Customize chatbot'
    },
    {
      title: 'Help Desks',
      plan: 'stardand'
    },
    {
      title: 'Integration'
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
    setActiveComponent(title); 
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
      case 'Integration':
        return <Integration />
      case 'Subscription Details':
        return <Subscription />
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
                <div onClick={() => handleNavigation(nav.title)} key={index} style={{display: 'flex', alignItems: 'center', backgroundColor: activeComponent === nav.title? '#EAEAEA' : 'white', gap: 25, justifyContent: 'flex-start', padding: 5, cursor: 'pointer'}}>
                  <h3 >{nav.title}</h3>
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