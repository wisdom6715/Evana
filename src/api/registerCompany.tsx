import { useState } from 'react';
import axios from 'axios';

interface RegisterCompanyData {
    name: string;
    ai_name: string;
    phone: string;
    domain_name: string;
}

interface UseCompanyRegistrationResult {
    registerCompany: (data: RegisterCompanyData) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

const useCompanyRegistration = (): UseCompanyRegistrationResult => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const registerCompany = async (data: RegisterCompanyData): Promise<void> => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axios.post(`${API_BASE_URL}/api/register`, data,{
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert(`Company registered successfully! Company ID: ${response.data.company_id}`);
            const company_id = response.data.company_id;
            saveToLocalStorage('companyId', company_id)
            /// company_id f750e419-3652-4b5f-9edc-1840c3e9994b
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
            alert(`Registration failed: ${err.response?.data?.message || err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const saveToLocalStorage = (key: string, value: string) => {
        try {
          const stringifiedValue = JSON.stringify(value);  // Convert object to string if needed
          localStorage.setItem(key, stringifiedValue);      // Store the data in localStorage
        } catch (error) {
          console.error("Error saving to localStorage", error);
        }
      };

    return {
        registerCompany,
        isLoading,
        error,
    };
};

export default useCompanyRegistration;
