"use client";
import React from 'react';
import useCheckAuth from './useCheck';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Run your authentication check once here
  useCheckAuth();

  // If the check passes, render the nested pages
  return <>{children}</>;
}
