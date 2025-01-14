import React, { useState } from 'react';
import Customize from '@/design-system/form/Customize';
import Profile from '../form/Profile';
import HelpDesk from '../form/HelpDesk';
import Privacy from '../form/Privacy';
import Integration from '../form/Integration';
import Subscription from '../form/Subscription';

interface NavProperty {
  title: string;
  plan?: string;
}

type ComponentType = 'Company Profile' | 'Customize chatbot' | 'Help Desks' | 'Integration' | 'Subscription Details' | 'Privacy';

const Settings: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<ComponentType>('Company Profile');

  const navProperties: NavProperty[] = [
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
  ];

  const handleNavigation = (title: ComponentType) => {
    console.log('Navigation triggered', title);
    setActiveComponent(title);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Company Profile':
        return <Profile />;
      case 'Customize chatbot':
        return <Customize />;
      case 'Privacy':
        return <Privacy />;
      case 'Help Desks':
        return <HelpDesk />;
      case 'Integration':
        return <Integration />;
      case 'Subscription Details':
        return <Subscription />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="w-full bg-white flex items-center justify-center">
      <div className="grid grid-cols-[15%_85%] w-4/5 bg-white h-4/5 border border-gray-400">
        <div className="bg-white flex items-center gap-5 flex-col pt-4 border-r border-gray-400">
          <h2>Account settings</h2>
          <div className="flex flex-col gap-2.5">
            {navProperties.map((nav, index) => (
              <div
                key={index}
                onClick={() => handleNavigation(nav.title as ComponentType)}
                className={`flex items-center gap-6 justify-start p-1.5 cursor-pointer ${
                  activeComponent === nav.title ? 'bg-[#EAEAEA]' : 'bg-white'
                }`}
              >
                <h3>{nav.title}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white w-full h-full">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;