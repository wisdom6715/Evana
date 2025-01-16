import React from 'react';
import { auth } from '@/lib/firebaseConfig';

const Test = () => {
  const user = auth.currentUser; // Correctly access currentUser directly from auth

  return (
    <div>
      <h1>{user?.displayName || 'No user logged in'}</h1>
    </div>
  );
};

export default Test;
