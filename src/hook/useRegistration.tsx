import { db, auth } from "@/lib/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import useCompany from '@/services/fetchComapnyData';
import fetchUserData from '@/services/fetchUserData';

const API_BASE_URL = 'http://localhost:5001';

interface CompanyData {
  company_name: string;
  company_contact: string;
  company_email: string;
  company_industry: string;
  company_address: string;
}

export const useCompanyRegistration = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { userData, loading } = fetchUserData();

  const { company } = useCompany({
    userId: user?.uid,
  });

  const [formData, setFormData] = useState<CompanyData>({
    company_name: "",
    company_contact: "",
    company_email: "",
    company_industry: "",
    company_address: "",
  });

  // ✅ Consolidated Authentication Check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Update form when company data changes
  useEffect(() => {
    if (company) {
      setFormData({
        company_name: company.company_name || "",
        company_contact: company.company_contact || "",
        company_email: company.company_email || "",
        company_industry: company.company_industry || "",
        company_address: company.company_address || "",
      });
    }
  }, [company]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setFormData({
      company_name: "",
      company_contact: "",
      company_email: "",
      company_industry: "",
      company_address: "",
    });
  };

  const saveToFirebase = async (companyData: CompanyData, companyId: string) => {
    if (!user) {
      throw new Error("No authenticated user found");
    }

    try {
      const companiesRef = collection(db, 'companies');
      const companyDoc = doc(companiesRef, companyId);

      if(!loading){
        await setDoc(companyDoc, {
          ...companyData,
          company_id: companyId,
          uid: user.uid,
          userData: userData?.subscription,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          status: 'active',
        });
      }

      return true;
    } catch (error) {
      console.error("Error saving to Firebase:", error);
      throw error;
    }
  };

  const registerCompany = async () => {
    setMessage("");
    setError("");

    if (!user) {
      setError("You must be logged in to register a company");
      return { success: false, error: "Authentication required" };
    }

    const { company_name, company_contact, company_email, company_industry, company_address } = formData;

    if (!company_name || !company_contact || !company_email || !company_industry || !company_address) {
      setError("All fields are required!");
      return { success: false, error: "All fields are required" };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "API registration failed");
      }

      const companyId = data.company.company_id;
      if (!companyId) throw new Error("No company ID received from API");

      await saveToFirebase(formData, companyId);

      setMessage("Company registered successfully and saved to database!");
      clearForm();

      return { success: true, company_id: companyId };

    } catch (err: any) {
      const errorMessage = err.message || "An error occurred during registration";
      setError(`Error: ${errorMessage}`);
      return { success: false, error: errorMessage };
    }
  };

  return {
    formData,
    handleChange,
    registerCompany,
    message,
    error,
    isLoading,
    user,
  };
};