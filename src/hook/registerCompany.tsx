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

const API_BASE_URL = 'http://localhost:5000/api/register';

const useCompanyRegistration = (): UseCompanyRegistrationResult => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [company_id, setCompany_id] = useState<string | null>(null);

    const registerCompany = async (data: RegisterCompanyData): Promise<void> => {
        setIsLoading(true);
        setError(null);
        
        console.log('Starting company registration with data:', data);
        console.log('Using API URL:', `${API_BASE_URL}`);
        
        try {
            const response = await axios.post<RegisterCompanyResponse>(
                `${API_BASE_URL}`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                }
            );
            
            console.log('API Response:', response.data);
            
            if (!response.data.company_id) {
                throw new Error('API response missing company_id');
            }
            
            console.log('Setting company_id to:', response.data.company_id);
            setCompany_id(response.data.company_id);
            
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            console.error('Registration error:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                error: error
            });
            
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            alert(`Registration failed: ${errorMessage}`);
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