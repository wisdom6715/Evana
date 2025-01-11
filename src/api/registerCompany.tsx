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
            const response = await axios.post(`${API_BASE_URL}/register`, data);
            alert(`Company registered successfully! Company ID: ${response.data.company_id}`);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
            alert(`Registration failed: ${err.response?.data?.message || err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        registerCompany,
        isLoading,
        error,
    };
};

export default useCompanyRegistration;
