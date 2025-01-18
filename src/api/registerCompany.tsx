import { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface RegisterCompanyData {
    name: string;
    ai_name: string;
    phone: string;
    domain_name: string;
}

interface RegisterCompanyResponse {
    company_id: string;
    message?: string;
}

interface ApiError {
    message: string;
    status?: number;
}

interface UseCompanyRegistrationResult {
    registerCompany: (data: RegisterCompanyData) => Promise<void>;
    isLoading: boolean;
    error: string | null;
    company_id: string | null;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

const useCompanyRegistration = (): UseCompanyRegistrationResult => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [company_id, setCompany_id] = useState<string | null>(null);

    const registerCompany = async (data: RegisterCompanyData): Promise<void> => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axios.post<RegisterCompanyResponse>(
                `${API_BASE_URL}/api/register`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            
            if (response.data.company_id) {
                setCompany_id(response.data.company_id);
            } else {
                throw new Error('No company_id received from registration');
            }
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            throw error; // Re-throw to handle in the component
        } finally {
            setIsLoading(false);
        }
    };

    return {
        registerCompany,
        isLoading,
        error,
        company_id
    };
};
export default useCompanyRegistration;