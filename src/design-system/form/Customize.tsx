'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useCustomization } from '@/hook/useCustomization';
import PreviewAgent from './PreviewAgent';
import useCompany from '@/services/fetchComapnyData';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '@/lib/firebaseConfig';
import { collection, updateDoc } from "firebase/firestore";
import { auth } from '@/lib/firebaseConfig';
import { query, where, getDocs } from "firebase/firestore";
import { PopFunction } from '@/_components/_subComponent/usePopUp'
export default function ChatbotConfigPage() {
  const [aiName, setAiName] = useState('');
  const [themeColor, setThemeColor] = useState('#007bff');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [responseText, setResponseText] = useState('');
  const [user, setUser] = useState(auth.currentUser);
  const [companyId, setCompanyId] = useState<string | null>(null);

  useEffect(() => {
    setCompanyId(localStorage.getItem('companyId'));
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const { company } = useCompany({
    userId: user?.uid,
    companyId: companyId!
  });

  const { 
    // updateConfig, 
    fetchConfig, 
    loading, 
  } = useCustomization();


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('ai_name', aiName);
    formData.append('theme_color', themeColor);
    if (logoFile) {
      formData.append('logo', logoFile);
    }

    try {
      if (!company?.company_id) {
        console.error("Invalid company_id or company object.");
        setResponseText("Invalid company_id.");
        return;
      }

      const companiesCollection = collection(db, "companies");
      const q = query(companiesCollection, where("company_id", "==", company.company_id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;

        await updateDoc(docRef, {
          response: "Your custom response here",
          ai_name: aiName,
          theme_color: themeColor,
          logo: logoFile ? logoFile.name : null,
        });

        console.log("Document updated successfully:", docRef.id);
      } else {
        console.error("No matching document found for company_id:", company.company_id);
      }
    } catch (err) {
      console.error("Error writing to the database:", err);
      setResponseText(`${err}`);
    }
  };


  const handleFetchConfig = async () => {
    try {
      const fetchedConfig = await fetchConfig(company?.company_id!);
      if (fetchedConfig) {
        setAiName(fetchedConfig.ai_name || '');
        setThemeColor(fetchedConfig.theme_color || '#007bff');
        setResponseText(JSON.stringify(fetchedConfig, null, 2));
      }
    } catch (err) {
      setResponseText(`Error: ${err}`);
    }
  };

  return (
    <div className="w-full h-full bg-white gap-5 flex flex-col pl-5">
      <h1 className="text-l">Chatbot Customization</h1>
      {responseText &&(
        <PopFunction 
          message={responseText} 
          type={responseText.includes('error') ? 'error' : 'success'}
        />
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className='grid h-full'>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className='flex flex-col gap-2'>
            <label className="block mb-2">AI Name</label>
            <input 
              type="text" 
              placeholder='Enter AI Name'
              value={aiName}
              onChange={(e) => setAiName(e.target.value)}
              required 
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className="block mb-2">Theme Color</label>
            <input 
              type="color" 
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
              className="w-full h-10 border rounded-md"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className="block mb-2">Company Logo</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="flex flex-row mt-5 gap-5 items-center">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-black px-2 text-white py-2 rounded-md hover:bg-green-600"
            >
              {loading ? 'Loading' : 'Customize'}
            </button>
            <button type="button" onClick={handleFetchConfig} className='hover:underline-offset-8'>Fetch Config</button>
          </div>
        </form>

        <div className='h-full w-[100%] flex justify-center'>
          <PreviewAgent 
            logo={logoFile} 
            chatbotName={aiName} 
            theme={themeColor} 
          />
        </div>
      </div>
    </div>
  );
}
