// Profile.tsx
import React from 'react';
import { useCompanyRegistration } from '@/hook/useRegistration';

type ComponentType = 'Company' | 'Customize' | 'Help Desks' | 'Integration' | 'Subscription' | 'Privacy';

interface ProfileProps {
  setActiveComponent: (component: ComponentType) => void;
}


// Industry options relevant for AI chatbot applications
const industryOptions = [
  { value: '', label: 'Select an industry' },
  { value: 'agritech', label: 'Tech/SAAS' },
  { value: 'agritech', label: 'AgriTech' },
  { value: 'edtech', label: 'EdTech' },
  { value: 'fintech', label: 'FinTech' },
  { value: 'healthtech', label: 'HealthTech' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'realEstate', label: 'Real Estate' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'retail', label: 'Retail' },
  { value: 'telecommunications', label: 'Telecommunications' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'banking', label: 'Banking' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'logistics', label: 'Logistics' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'customerService', label: 'Customer Service' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'legal', label: 'Legal Services' },
  { value: 'other', label: 'Other' }
];

const Profile: React.FC<ProfileProps> = ({ setActiveComponent }) => {
  const {
    formData,
    handleChange,
    registerCompany,
    message,
    error: apiError
  } = useCompanyRegistration();

  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.company_name.trim()) {
      newErrors.company_name = 'Company name is required';
    }

    if (!formData.company_address.trim()) {
      newErrors.company_address = 'Company address is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.company_email)) {
      newErrors.company_email = 'Invalid email address';
    }

    if (!formData.company_industry) {
      newErrors.company_industry = 'Please select an industry';
    }

    if (!formData.company_contact.trim()) {
      newErrors.company_contact = 'Contact number is required';
    } else if (!/^\d+$/.test(formData.company_contact)) {
      newErrors.company_contact = 'Invalid contact number';
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      await registerCompany();
      if (!apiError) {
        setActiveComponent('Customize');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Enter Your Company's Information</h1>

      {message && <div className="text-green-500 font-bold">{message}</div>}
      {apiError && <div className="text-red-500 font-bold">{apiError}</div>}

      <div className="flex flex-col gap-2">
        <label htmlFor="company_name">Company Name:</label>
        <input
          id="company_name"
          name="company_name"
          type="text"
          value={formData.company_name}
          onChange={handleChange}
          style={{ width: '40%' }}
          className={`bg-gray-200 rounded px-3 h-8 ${validationErrors.company_name ? 'border-2 border-red-500' : ''}`}
        />
        {validationErrors.company_name && (
          <span className="text-red-500 text-sm">{validationErrors.company_name}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="company_address">Company Address:</label>
        <input
          id="company_address"
          name="company_address"
          type="text"
          value={formData.company_address}
          onChange={handleChange}
          style={{ width: '40%' }}
          className={`bg-gray-200 rounded px-3 h-8 ${validationErrors.company_address ? 'border-2 border-red-500' : ''}`}
        />
        {validationErrors.company_address && (
          <span className="text-red-500 text-sm">{validationErrors.company_address}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="company_email">Company Email:</label>
        <input
          id="company_email"
          name="company_email"
          type="email"
          value={formData.company_email}
          onChange={handleChange}
          style={{ width: '40%' }}
          className={`bg-gray-200 rounded px-3 h-8 ${validationErrors.company_email ? 'border-2 border-red-500' : ''}`}
        />
        {validationErrors.company_email && (
          <span className="text-red-500 text-sm">{validationErrors.company_email}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="company_industry">Company Industry</label>
        <select
          id="company_industry"
          name="company_industry"
          value={formData.company_industry}
          onChange={handleChange}
          style={{ width: '40%' }}
          className={`bg-gray-200 rounded px-3 h-8 ${validationErrors.company_industry ? 'border-2 border-red-500' : ''}`}
        >
          {industryOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {validationErrors.company_industry && (
          <span className="text-red-500 text-sm">{validationErrors.company_industry}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="company_contact">Company Contact</label>
        <input
          id="company_contact"
          name="company_contact"
          type="tel"
          value={formData.company_contact}
          onChange={handleChange}
          style={{ width: '40%' }}
          className={`bg-gray-200 rounded px-3 h-8 ${validationErrors.company_contact ? 'border-2 border-red-500' : ''}`}
        />
        {validationErrors.company_contact && (
          <span className="text-red-500 text-sm">{validationErrors.company_contact}</span>
        )}
      </div>

      <button
        type="submit"
        style={{ width: '40%' }}
        className="bg-black text-white py-2 mt-2 rounded hover:bg-gray-800 transition-colors"
      >
        Save and continue
      </button>
    </form>
  );
};

export default Profile;