// src/design-system/form/HelpDesk.tsx
import { useAuth } from '@/design-system/form/hooks/inviteAuth';
import { InviteForm } from './InviteForm';

export const HelpDesk: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in to continue</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Invite Team Member</h2>
      <InviteForm 
        currentUser={user}
        onSuccess={() => {
          console.log('Invite sent successfully');
        }}
        onError={(error) => {
          console.error('Failed to send invite:', error);
        }}
      />
    </div>
  );
};

export default HelpDesk;