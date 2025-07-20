'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import PreviewAgent from './PreviewAgent';
import { useCompanyRegistration } from '@/hook/useRegistration';
import { useCustomization, CustomizationData } from '@/hook/useCustomization';

// Define the local form state interface for your UI fields
interface ChatbotConfigForm {
  chatbotName: string;
  welcomeMessage: string;
  logo: File | null;
  theme: string;
}

const ChatbotConfigPage: React.FC = () => {
  // Company registration hook
  const { 
    user, 
    isLoading, 
    error: registrationError 
  } = useCompanyRegistration();

  // Customization hook
  const { 
    data: customizationData, 
    updateField, 
    updateCustomization, 
    message: customizationMessage, 
    error: customizationError 
  } = useCustomization();

  // Local state for UI form
  const [formData, setFormData] = useState<ChatbotConfigForm>({
    chatbotName: '' ,
    welcomeMessage: '',
    logo: null,
    theme: '#000000'
  });


  // Update customization data when form changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    
    if (name === 'logo' && target.files) {
      const file = target.files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      // Update customization data – map local "logo" to "company_logo"
      updateField('company_logo' as keyof CustomizationData, file);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Map UI fields to customization fields
      // Define a mapping from our UI state keys to the hook's keys
      const fieldMapping: { [key in keyof ChatbotConfigForm]?: keyof CustomizationData } = {
        chatbotName: 'ai_name',
        welcomeMessage: 'welcome_message',
        theme: 'theme'
      };
      
      if (name in fieldMapping && fieldMapping[name as keyof ChatbotConfigForm]) {
        updateField(fieldMapping[name as keyof ChatbotConfigForm]!, value);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    try {
      // Update customization with the current company ID (using the user's UID)
      updateField('company_id', user.uid);
      await updateCustomization();
      
      console.log('Form data:', formData);
      console.log('Customization data:', customizationData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (isLoading) {
    return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <div className="w-full h-full flex items-center justify-center">Please log in to configure your chatbot</div>;
  }

  return (
    <div className="w-full h-full bg-white gap-5" style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold">
          Customize your Chatbot agent to your company brand
        </h1>
        
        {(registrationError || customizationError) && (
          <div className="text-red-500">
            {registrationError || customizationError}
          </div>
        )}
        
        {customizationMessage && (
          <div className="text-green-500">
            {customizationMessage}
          </div>
        )}
        
        <div className="flex flex-col gap-2">
          <label htmlFor="chatbotName">Agent Name:</label>
          <input
            id="chatbotName"
            name="chatbotName"
            type="text"
            value={formData.chatbotName}
            onChange={handleInputChange}
            className="bg-gray-200 rounded px-3 h-8 w-4/5"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="welcomeMessage">Welcome Message:</label>
          <input
            id="welcomeMessage"
            name="welcomeMessage"
            type="text"
            value={formData.welcomeMessage}
            onChange={handleInputChange}
            className="bg-gray-200 rounded px-3 h-8 w-4/5"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="logo">Company Logo:</label>
          <input
            id="logo"
            name="logo"
            type="file"
            onChange={handleInputChange}
            accept="image/*"
            className="bg-gray-200 rounded px-3 h-8 w-4/5"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="theme">Theme Color:</label>
          <input
            id="theme"
            name="theme"
            type="color"
            value={formData.theme}
            onChange={handleInputChange}
            className="bg-gray-200 h-8 w-4/5"
          />
        </div>

        <button 
          type="submit"
          className="bg-black text-white py-2 w-4/5 mt-2 rounded hover:bg-gray-800 transition-colors"
        >
          Save and continue
        </button>
      </form>

      <PreviewAgent
        logo={formData.logo }
        chatbotName={formData.chatbotName}
        theme={formData.theme}
        welcomeMessage={formData.welcomeMessage}
      />
    </div>
  );
};

export default ChatbotConfigPage;