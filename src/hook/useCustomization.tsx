import { useState } from 'react';

interface CustomizationConfig {
  ai_name: string;
  theme_color: string;
  logo?: string;
}

export const useCustomization = (companyId?: string) => {
  const [config, setConfig] = useState<CustomizationConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateConfig = async (companyId: string, formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/chatbot/${companyId}/config`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setConfig(data.config);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchConfig = async (companyId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/chatbot/${companyId}/config`);
      const data = await response.json();
      setConfig(data.config);
      return data.config;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fetch failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    config, 
    updateConfig, 
    fetchConfig, 
    loading, 
    error 
  };
};