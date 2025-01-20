'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

interface Company {
  id: string;
  name: string;
  description: string;
  company_id?: string;
  user_id?: string;
  phone?: string;
  ai_name?: string;
  domain_name?: string;
}

interface UseCompanyReturn {
  company: Company | null;
  loading: boolean;
  error: string | null;
}

interface UseCompanyParams {
  companyId?: string;
  userId?: string;
}

const useCompany = ({ companyId, userId }: UseCompanyParams): UseCompanyReturn => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async ({ companyId, userId }: UseCompanyParams) => {
      const companyCollectionRef = collection(db, 'companies');
      const results: Company[] = [];
    
      try {
        if (companyId) {
          const q1 = query(companyCollectionRef, where('company_id', '==', companyId));
          const snap1 = await getDocs(q1);
          snap1.forEach(doc => results.push({ id: doc.id, ...doc.data() } as Company));
        }
        if (userId) {
          const q2 = query(companyCollectionRef, where('uid', '==', userId));
          const snap2 = await getDocs(q2);
          console.log('Documents for userId:', userId, snap2.docs.map(doc => doc.data()));
          snap2.forEach(doc => {
            if (!results.find(r => r.id === doc.id)) {
              results.push({ id: doc.id, ...doc.data() } as Company);
            }
          });
        }
    
        if (results.length === 0) {
          setError('Company not found');
          setCompany(null);
        } else {
          setError(null);
          setCompany(results[0]); // Use the first matching result
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany({ companyId, userId });
  }, [companyId, userId]);

  return { company, loading, error };
};

export default useCompany;