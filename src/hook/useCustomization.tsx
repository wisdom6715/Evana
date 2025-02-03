import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebaseConfig';
import useCompany from '@/services/fetchComapnyData';
import { onAuthStateChanged } from 'firebase/auth';

export interface CustomizationData {
  company_id: string;
  ai_name: string;
  theme: string;
  welcome_message: string;
  company_logo: File | null;
}

export const useCustomization = () => {
  const [user, setUser] = useState(auth.currentUser);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const storedCompanyId = localStorage.getItem('companyId') || '';
  const { company } = useCompany({
    userId: user?.uid || '',
    companyId: storedCompanyId
  });

  // Create state only after we have the company data
  const [data, setData] = useState<CustomizationData | null>(null);

  // Initialize or update data when company information is available
  useEffect(() => {
    if (company && company.company_id) {
      setData({
        company_id: company.company_id,
        ai_name: "",
        theme: "",
        welcome_message: "",
        company_logo: null,
      });
    }
  }, [company]);

  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const updateField = (field: keyof CustomizationData, value: string | File | null) => {
    if (data) {
      setData({
        ...data,
        [field]: value,
      });
    }
  };

  const updateCustomization = async () => {
    if (!data) return;

    setMessage("");
    setError("");

    const { company_id, ai_name, theme, welcome_message, company_logo } = data;

    if (!company_id || !ai_name || !theme || !welcome_message || !company_logo) {
      setError("All fields are required, including logo!");
      return;
    }

    const formData = new FormData();
    formData.append("company_logo", company_logo);
    formData.append("ai_name", ai_name);
    formData.append("theme", theme);
    formData.append("welcome_message", welcome_message);

    try {
      const response = await fetch(`http://localhost:5001/customization/${company_id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update customization');
      }

      const resData = await response.json();
      setMessage(resData.message || "Customization updated!");
    } catch (err: any) {
      setError("❌ Error: " + err.message);
    }
  };

  return { 
    data, 
    updateField, 
    updateCustomization, 
    message, 
    error,
    isLoading: !data,
    user 
  };
};