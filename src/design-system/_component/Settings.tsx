import React, { useState } from 'react';
import Customize from '@/design-system/form/Customize';
import Profile from '../form/Profile';
import HelpDesk from '../form/HelpDesk';
import Integration from '../form/Integration';
import Subscription from '../form/Subscription';

interface NavProperty {
  title: string;
}

type ComponentType = 'Company' | 'Customize' | 'Help Desks' | 'Integration' | 'Subscription' | 'Privacy';

const Settings: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<ComponentType>('Company');

  const navProperties: NavProperty[] = [
    {
      title: 'Company'
    },
    {
      title: 'Customize'
    },
    {
      title: 'Help Desks',
    },
    {
      title: 'Integration'
    },
    {
      title: 'Subscription'
    }
  ];

  const handleNavigation = (title: ComponentType) => {
    console.log('Navigation triggered', title);
    setActiveComponent(title);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Company':
        return <Profile setActiveComponent={setActiveComponent}/>;
      case 'Customize':
        return <Customize />;
      case 'Help Desks':
        return <HelpDesk />;
      case 'Integration':
        return <Integration/>;
      case 'Subscription':
        return <Subscription />;
      default:
        return <Profile setActiveComponent={setActiveComponent}/>;
    }
  };

  return (
    <div className="w-full bg-white flex items-center justify-center">
      <div style={{height: '80%', display: 'grid', gridTemplateColumns: '15% 85%'}} className=" w-4/5 bg-blue-800 border border-gray-400">
        <div className="bg-white flex items-start gap-6 flex-col px-4 border-r border-gray-400">
          <h2 className="text-lg font-medium" style={{paddingTop: '1rem'}}>Account settings</h2>
          <div className="flex flex-col w-full gap-2">
            {navProperties.map((nav, index) => (
              <div
                key={index}
                onClick={() => handleNavigation(nav.title as ComponentType)}
                className={`flex items-center w-full justify-start px-3 py-2 cursor-pointer rounded-md transition-colors ${
                  activeComponent === nav.title ? 'bg-gray-200 hover:bg-gray-300' : 'bg-white hover:bg-gray-100'
                }`}
              >
                <h3 className="text-sm">{nav.title}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white w-full h-full p-6 border border-l-black">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;