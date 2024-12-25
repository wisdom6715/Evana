'use client'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebaseConfig'

interface PaymentProps {
  email: string
  amount: number
  metadata: {
    name: string
    custom_fields: Array<{
      display_name: string
      variable_name: string
      value: string
    }>
  }
  publicKey: string
  text: string
  onSuccess: () => void
  onClose: () => void
}

const usePayment = () => {
  const [isClient, setIsClient] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Set to true after the component mounts to avoid SSR issues
    setIsClient(true)

    // Listen to auth state changes and update the user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    // Cleanup the listener on component unmount
    return () => unsubscribe()
  }, [])
  /// testing public key
  const publicKey = 'pk_test_0f6dbe5cfc910acdd8e996e823a74fefc66b2d79'
  // Adjust the amount according to the user's plan or bill type. For simplicity, we're assuming a fixed amount.
  /// configure plan and bill type f each user
  const amount = 5000 * 100 // Amount in kobo

  // Wait until the user is available before rendering componentProps
  if (!user) {
    return { isClient, componentProps: null }
  }

  const componentProps: PaymentProps = {
    email: user?.email ?? '',
    amount,
    metadata: {
      name: user?.displayName ?? '',
      custom_fields: [
        {
          display_name: user?.displayName ?? '',
          variable_name: user?.uid ?? '',
          value: user?.phoneNumber ?? '', 
        },
      ],
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      window.location.href = '/dashboard/settings',
      // alert("Thanks for donating to us! We do not take it for granted!!"),
    onClose: () => alert("Wait! You need to donate, don't go!!!!"),
  }

  return {
    componentProps,
    isClient
  }
}

export default usePayment
