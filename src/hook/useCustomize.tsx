import { useState } from 'react';

interface UploadedItem {
  text: string;
  image_url: string;
  timestamp: string;
}

interface ApiResponse {
  status: 'success' | 'error';
  message?: string;
  data?: UploadedItem[];
}

export const useFileUpload = () => {
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [uploadedData, setUploadedData] = useState<UploadedItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadFile = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/form/upload', {
        method: 'POST',
        body: formData,
      });
      const result: ApiResponse = await response.json();

      if (result.status === 'success') {
        setResponseMessage(result.message || 'Upload successful');
        await fetchUploadedData();
      } else {
        setResponseMessage(result.message || 'Error uploading data');
      }
    } catch (error) {
      setResponseMessage('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUploadedData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/form/data/7267d6c7-1f4b-49b1-878d-39ab30884e8d');
      const result: ApiResponse = await response.json();

      if (result.status === 'success') {
        setUploadedData(result.data || []);
      } else {
        setResponseMessage('Error loading data');
      }
    } catch (error) {
      setResponseMessage('Network error occurred');
    }
  };

  return {
    uploadFile,
    fetchUploadedData,
    responseMessage,
    uploadedData,
    isLoading
  };
};