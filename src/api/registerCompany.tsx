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
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

const useCompanyRegistration = (): UseCompanyRegistrationResult => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
            
            alert(`Company registered successfully! Company ID: ${response.data.company_id}`);
            saveToLocalStorage('companyId', response.data.company_id);
            
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            alert(`Registration failed: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    const saveToLocalStorage = (key: string, value: string) => {
        try {
            const stringifiedValue = JSON.stringify(value);
            localStorage.setItem(key, stringifiedValue);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error saving to localStorage:", error.message);
            } else {
                console.error("Unknown error saving to localStorage");
            }
        }
    };

    return {
        registerCompany,
        isLoading,
        error,
    };
};

export default useCompanyRegistration;