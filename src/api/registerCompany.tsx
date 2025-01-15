import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

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
            const companyId = response.data.company_id
            alert(`Company registered successfully! Company ID: ${response.data.company_id}`);
            const collectionRef = collection(db, "users");
            const docRef = await addDoc(collectionRef, { companyId });
            console.log(docRef.id);
            
        } catch (err) {
            const error = err as AxiosError<ApiError>;
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
    };
};

export default useCompanyRegistration;