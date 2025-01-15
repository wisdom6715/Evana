// src/design-system/form/InviteForm.tsx
import { useState } from 'react';
import { User } from '@/design-system/index';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

export interface InviteFormProps {
  currentUser: User;  // Required prop
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const InviteForm: React.FC<InviteFormProps> = ({
  currentUser,
  onSuccess,
  onError
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.companyId) return;

    setLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, 'invites'), {
        email: email.toLowerCase(),
        companyId: currentUser.companyId,
        inviterUid: currentUser.uid,
        accepted: false,
        createdAt: serverTimestamp(),
      });

      setEmail('');
      onSuccess?.();
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border p-2"
          placeholder="colleague@company.com"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Invite'}
      </button>
      
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </form>
  );
};