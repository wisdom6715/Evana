import React, { useState, useContext, createContext, ReactNode } from 'react';

// Define the type for the billing data
interface BillTypes {
  plan: string;
  duration: string;
  amount: number;
}

// Define the context type
interface BillingContextType {
  billingType: BillTypes;
  setBillingType: React.Dispatch<React.SetStateAction<BillTypes>>;
}

// Create a context with a default value
const billingContext = createContext<BillingContextType | undefined>(undefined);

// Type the provider component
interface BillingProviderProps {
  children: ReactNode;
}

const BillingProvider: React.FC<BillingProviderProps> = ({ children }) => {
  const [billingType, setBillingType] = useState<BillTypes>({
    plan: '',
    duration: '',
    amount: 0,
  });

  return (
    <billingContext.Provider value={{ billingType, setBillingType }}>
      {children}
    </billingContext.Provider>
  );
};

// Custom hook for consuming the context
export const useBillingContext = (): BillingContextType => {
  const context = useContext(billingContext);
  if (!context) {
    throw new Error('useBillingContext must be used within a BillingProvider');
  }
  return context;
};

export default BillingProvider;