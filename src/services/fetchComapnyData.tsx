'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

interface Company {
  id: string;
  name: string;
  description: string;
  company_id?: string;
}

interface UseCompanyReturn {
  company: Company | null;
  loading: boolean;
  error: string | null;
}

const useCompany = (companyId: string): UseCompanyReturn => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!companyId) {
        setError('Company ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const companyCollectionRef = collection(db, 'companies');
        const q = query(companyCollectionRef, where('company_id', '==', companyId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError('Company not found');
          setCompany(null);
        } else {
          const doc = querySnapshot.docs[0];
          setCompany({
            id: doc.id,
            ...doc.data() as Omit<Company, 'id'>
          });
          setError(null);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId]);

  return { company, loading, error };
};

export default useCompany;