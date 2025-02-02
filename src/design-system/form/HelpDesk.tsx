import React, { useState, useEffect } from 'react';
import useCompany from '@/services/fetchComapnyData';
import { auth } from '@/lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export const HelpDesk: React.FC = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [companyId, setCompanyId] = useState<string | null>(null);

  useEffect(() => {
    // Get companyId from localStorage only on client side
    setCompanyId(localStorage.getItem('companyId'));
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const { company } = useCompany({
    userId: user?.uid,
    companyId: companyId!
  });

  const sendInvite = async () => {
    if (!email || !company?.company_id) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/send-invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          companyId: company.company_id,
          companyName: company.name || 'Our Company'
        }),
      });

      if (!response.ok) throw new Error('Failed to send invitation');

      setStatus({
        type: 'success',
        message: 'Invitation sent successfully!'
      });
      setEmail('');
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send invitation. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="w-full h-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="max-w-2xl bg-white rounded-lg shadow flex flex-col gap-5">
        <h2 className="text-xl">Invite Team Member</h2>
        <div className="space-y-4">
          <div className='flex gap-2 flex-col'>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="flex gap-2">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="colleague@company.com"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendInvite}
                disabled={loading || !email || !company?.company_id}
                className={`px-4 py-2 rounded-md text-white ${
                  loading || !email || !company?.company_id
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-black hover:bg-gray-500'
                }`}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  'Send Invite'
                )}
              </button>
            </div>
          </div>

          {status.message && (
            <div
              className={`p-4 rounded-md ${
                status.type === 'error'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}
            >
              {status.message}
            </div>
          )}

          {!company?.company_id && (
            <div className="p-4 rounded-md bg-red-50 text-red-700 border border-red-200">
              You need admin access to invite team members.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpDesk;