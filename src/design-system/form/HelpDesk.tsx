"use client";
import { PopFunction } from '@/_components/_subComponent/usePopUp';
import React, { useState, useEffect } from 'react';
import { auth } from '@/lib/firebaseConfig';
import useCompany from '@/services/fetchComapnyData';
import { onAuthStateChanged } from 'firebase/auth';

type InviteTypes = {
  email: string;
  name: string;
};

export const HelpDesk: React.FC = () => {
  const [sendInvite, setSendInvite] = useState<InviteTypes>({
    email: '',
    name: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const { company, loading: isCompanyLoading } = useCompany({
    userId: user?.uid,
  });

  const sendEmail = async (invite: InviteTypes) => {
    setIsLoading(true);
    setError(null);

    // Validate company data
    if (!company?.company_id || !company?.company_name) {
      setError("Company information is not available. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/send-invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inviteeEmail: invite.email,
          inviteeName: invite.name,
          companyId: company.company_id,
          companyName: company.company_name
        })
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send invite');
      }

      setIsSuccess(true);
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send invite';
      setError(message);
      console.error('Error sending email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendEmail(sendInvite);
    setSendInvite({ email: '', name: '' });
  };

  if (isCompanyLoading) {
    return <div>Loading company information...</div>;
  }

  return (
    <div className="w-[100%] p-4 flex flex-col gap-7">
      <div className='flex flex-col w-[40%] gap-2'>
        <h1 className="text-l font-bold">Invite Your Team</h1>
        <p className="text-l font-medium">Invite your team members to join Evana</p>
      </div>

      {isSuccess && <PopFunction message="Invite sent successfully" type="success" />}
      {error && <PopFunction message={error} type="error" />}

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={sendInvite.email}
          className="bg-gray-200 rounded px-3 h-8 w-1/2"
          onChange={(e) => setSendInvite({ ...sendInvite, email: e.target.value })}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={sendInvite.name}
          className="bg-gray-200 rounded px-3 h-8 w-1/2"
          onChange={(e) => setSendInvite({ ...sendInvite, name: e.target.value })}
          required
        />
        
        <button 
          className="bg-black text-white py-2 mt-2 rounded hover:bg-gray-800 transition-colors w-1/2"
          type="submit"
          disabled={isLoading || isCompanyLoading}
        >
          {isLoading ? 'Sending...' : 'Send Invite'}
        </button>
      </form>
    </div>
  );
};

export default HelpDesk;