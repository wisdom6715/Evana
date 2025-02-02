"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";

import { auth } from "@/lib/firebaseConfig";
import useCompany from "@/services/fetchComapnyData";
import fetchUserData from "@/services/fetchUserData";

/**
 * Custom hook that:
 * 1. Watches Firebase auth state
 * 2. Pulls user profile (userData) once known
 * 3. Fetches company data via companyId
 * 4. Redirects based on subscription, etc.
 */
export default function useCheckAuth() {
  const router = useRouter();
  const pathname = usePathname();

  const [firebaseUser, setFirebaseUser] = useState<null | { uid: string }>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Grab user data from your DB (e.g. includes subscription status)
  const { userData, loading: userLoading } = fetchUserData();

  // Grab companyId from localStorage
  const [companyId, setCompanyId] = useState("");
  useEffect(() => {
    const storedCompanyId = localStorage.getItem("companyId") ?? "";
    setCompanyId(storedCompanyId);
  }, []);

  // Grab company details
  const { company, loading: companyLoading } = useCompany({ companyId });

  // Wait for Firebase to confirm if user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  // Once we know auth + have user data, do our logic
  useEffect(() => {
    // If we haven't confirmed auth or user data, don’t jump anywhere
    // (prevents us from redirecting “too soon”)
    if (!authChecked || userLoading || companyLoading) {
      return;
    }

    // 1) If there’s no Firebase user at all, go to /auth
    if (!firebaseUser) {
      router.push("/auth");
      return;
    }

    // 2) If user has an active subscription, only redirect if they're on /auth
    if (userData?.subscription?.status === "active") {
      if (pathname === "/auth") {
        router.push("/dashboard/home");
      }
      // Otherwise, let them stay where they are
      return;
    }

    // 3) If user’s company matches, only redirect if they're on /auth
    if (company?.company_id === companyId) {
      if (pathname === "/auth") {
        router.push("/dashboard/home");
      }
      return;
    }

    // 4) If user is on /auth page but fails checks above, maybe show a welcome screen
    if (pathname === "/auth") {
      router.push("/welcome");
    }
  }, [
    authChecked,
    userLoading,
    companyLoading,
    firebaseUser,
    userData,
    company,
    companyId,
    pathname,
    router,
  ]);

  // Return all relevant data in case you need it
  return {
    loading: !authChecked || userLoading || companyLoading,
    firebaseUser,
    userData,
    company,
  };
}