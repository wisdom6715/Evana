import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const Invitation = () => {
  const [showInvitation, setShowInvitation] = useState(false);
  const [agentName, setAgentName] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkInvitationStatus();
  }, []);

  const checkInvitationStatus = () => {
    const storedAgent = localStorage.getItem('agentName');
    const lastCheck = localStorage.getItem('lastInvitationCheck');
    const today = new Date().toDateString();

    if (!storedAgent || (lastCheck !== today)) {
      setShowInvitation(true);
      localStorage.setItem('lastInvitationCheck', today);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (agentName.trim()) {
      localStorage.setItem('agentName', agentName.trim());
      localStorage.setItem('lastInvitationCheck', new Date().toDateString());
      setShowInvitation(false);
    }
  };

  const handleCancel = () => {
    const existingAgent = localStorage.getItem('agentName');
    if (existingAgent) {
      setShowInvitation(false);
    }
    router.replace('/dashboard/home')

  };

  if (!showInvitation) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-[90%] md:w-[35%] max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-center text-2xl font-bold">
            Welcome to IntuitionLabs
          </h2>
        </div>
        
        <div className="space-y-6">
          <p className="text-center text-gray-600">
            Please enter your username that will be visible to customers 
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your agent name"
              required
            />

            <div className="flex justify-center gap-3">
              <button
                type="submit"
                disabled={!agentName.trim()}
                className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 
                         disabled:bg-gray-400 disabled:cursor-not-allowed
                         transition-colors duration-200"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2 border border-black text-black rounded-md
                         hover:bg-gray-100 disabled:opacity-50 
                         disabled:cursor-not-allowed transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Invitation;