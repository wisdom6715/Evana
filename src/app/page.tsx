"use client";

import React, { useState } from 'react';
import Page from '@/app/auth/page';  // The initial page component
import BillingProvider from '@/services/useBillingContext';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track the user authentication state

  return (
    <div>
      {/* Render the initial page only without context */}
      <Page/>
      
      {/* After authentication, wrap the app in the BillingProvider */}
      {isAuthenticated && (
        <BillingProvider>
          {/* You can add a component/page that requires the context after authentication */}
          <p>Now you have access to billing context!</p>
        </BillingProvider>
      )}
    </div>
  );
}
