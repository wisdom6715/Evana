"use client";

import React from 'react';
import Page from '@/app/auth/page';  // The initial page component

export default function Home() {

  return (
    <div>
      {/* Render the initial page only without context */}
      <Page/>
      
      {/* After authentication, wrap the app in the BillingProvider */}
    </div>
  );
}
