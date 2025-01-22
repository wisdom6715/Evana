import { useState, useCallback } from 'react';
import axios from 'axios';

interface RegistrationConfig {
  chatbotName: string;
  welcomeMessage?: string;
  icon?: File;
}

interface UseRegistrationForm {
  companyId: string;
  apiBaseUrl?: string;
}

interface RegistrationResponse {
  status: 'success' | 'error';
  message?: string;
  config?: {
    name: string;
    welcome_message?: string;
    icon_path?: string;
  };
}

export const useCutomize = ({ 
  companyId,
  apiBaseUrl = 'http://127.0.0.1:5000/api/chatbot'
}: UseRegistrationForm) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentConfig, setCurrentConfig] = useState<RegistrationResponse['config']>();

  // Load current configuration
  const loadCurrentConfig = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<RegistrationResponse>(
        `${apiBaseUrl}/${companyId}/config`
      );
      
      if (response.data.config) {
        setCurrentConfig(response.data.config);
      }
      setError(null);
    } catch (err) {
      setError('Failed to load current configuration');
      console.error('Error loading config:', err);
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl, companyId]);

  // Update configuration
  const updateConfig = async (data: RegistrationConfig) => {
    try {
        setLoading(true);
        setError(null);
        setSuccess(null);

        const formData = new FormData();
        formData.append('chatbot_name', data.chatbotName);
        
        if (data.welcomeMessage) {
            formData.append('welcome_message', data.welcomeMessage);
        }
        
        if (data.icon) {
            formData.append('icon', data.icon);
        }

        // Add detailed error logging
        const response = await axios.post(
            `${apiBaseUrl}/${companyId}/config`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).catch(error => {
            if (error.response) {
                console.error('Server Error Response:', error.response.data);
                throw new Error(`Server Error: ${error.response.data.message || 'Unknown server error'}`);
            }
            throw error;
        });

        if (response.data.status === 'success') {
            setSuccess('Configuration updated successfully');
            await loadCurrentConfig();
        } else {
            throw new Error(response.data.message || 'Failed to update configuration');
        }
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update configuration';
        setError(errorMessage);
        console.error('Error updating config:', err);
    } finally {
        setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    currentConfig,
    updateConfig,
    loadCurrentConfig,
  };
};