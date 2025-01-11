import { useState, useRef, RefObject } from 'react';
import axios from 'axios';

interface UseFileUploadOptions {
  apiBaseUrl?: string;
  companyId: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface FileUploadState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

interface FileUploadActions {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleFileUpload: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

export const useFileUpload = ({
  apiBaseUrl = 'http://localhost:5000/api',
  companyId,
  onSuccess,
  onError,
}: UseFileUploadOptions): [FileUploadState, FileUploadActions] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  // Initialize with non-null assertion since we know it will be used with an input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);

      const formData = new FormData();
      formData.append('file', file);

      await axios.post(
        `${apiBaseUrl}/upload/${companyId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setIsSuccess(true);
      onSuccess?.();
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : err instanceof Error ? err.message : 'An error occurred during upload';
      
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const files = fileInputRef.current?.files;
    if (files && files.length > 0) {
      await uploadFile(files[0]);
    }
  };

  return [
    { isLoading, error, isSuccess },
    { handleSubmit, handleFileUpload, fileInputRef }
  ];
};
