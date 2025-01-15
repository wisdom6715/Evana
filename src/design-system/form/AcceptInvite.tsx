// components/AcceptInvite.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Invite, User } from '@/design-system/index';
import { doc, runTransaction } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

interface AcceptInviteProps {
  invite: Invite;
  currentUser: User;
  onAccepted?: () => void;
  onError?: (error: Error) => void;
  redirectPath?: string;
}

export function AcceptInvite({ 
  invite, 
  currentUser,
  onAccepted,
  onError,
  redirectPath = '/dashboard'
}: AcceptInviteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isExpired = invite.expiresAt.toDate() < new Date();

  const handleAccept = async () => {
    if (!currentUser || !invite) return;
    if (isExpired) {
      setError('This invitation has expired');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      await runTransaction(db, async (transaction) => {
        const inviteRef = doc(db, 'invites', invite.id);
        const userRef = doc(db, 'users', currentUser.uid);
        
        // Update invite status
        transaction.update(inviteRef, { accepted: true });
        
        // Update user's company and role if specified
        const updates: Partial<User> = {
          companyId: invite.companyId
        };
        if (invite.role) {
          updates.isAdmin = invite.role === 'admin';
        }
        transaction.update(userRef, updates);
      });

      onAccepted?.();
      router.push(redirectPath);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  if (invite.accepted) {
    return (
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Invite Already Accepted
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>This invitation has already been used.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Invitation Expired
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>This invitation has expired. Please request a new one.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (invite.email !== currentUser.email) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Invalid Invitation
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>This invitation was sent to a different email address.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h3 className="text-lg font-medium">Accept Team Invitation</h3>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          You've been invited to join as a {invite.role || 'member'}.
        </p>
      </div>
      <div className="mt-5">
        <button
          onClick={handleAccept}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Accepting...' : 'Accept Invitation'}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}