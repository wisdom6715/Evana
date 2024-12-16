'use client'

import { useState } from 'react';

// Define a Message type for better type safety
interface Message {
  type: 'user' | 'ai';
  text: string;
}

const useCustomerServiceAI = () => {
  const [status, setStatus] = useState('');
  const [qaStatus, setQaStatus] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [emailPromptVisible, setEmailPromptVisible] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [email, setEmail] = useState('');

  const handleFileUpload = async (file: File) => {
    if (!file) {
      setStatus('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Upload failed');
      }

      setStatus(`Success: ${result.message}`);
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    }
  };

  const handleQuerySubmit = async (query: string) => {
    if (!query) {
      setQaStatus('Please enter a question');
      return;
    }

    // Add user message to messages
    setMessages(prevMessages => [...prevMessages, { type: 'user', text: query }]);
    setCurrentQuery(query);

    await processQuery(query);
  };

  const handleEmailSubmit = async (submittedEmail: string) => {
    if (!submittedEmail) {
      setQaStatus('Please enter a valid email');
      return;
    }

    await processQuery(currentQuery, submittedEmail);
  };

  const processQuery = async (query: string, submittedEmail: string | null = null) => {
    try {
      const requestBody = submittedEmail 
        ? { query, email: submittedEmail } 
        : { query };

      const response = await fetch('http://127.0.0.1:5000/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const result = await response.json();

      // Handle email required scenario
      if (response.status === 400 && result.status === 'email_required') {
        setQaStatus(result.message);
        setEmailPromptVisible(true);
        return;
      }

      // Reset email prompt
      setEmailPromptVisible(false);
      setEmail('');

      // Successful response
      setQaStatus('Question processed successfully');
      
      // Add AI response to messages
      setMessages(prevMessages => [...prevMessages, { 
        type: 'ai', 
        text: result.answer || result.message 
      }]);

    } catch (error: any) {
      setQaStatus(`Error: ${error.message}`);
      
      // Add error message to messages
      setMessages(prevMessages => [...prevMessages, { 
        type: 'ai', 
        text: `Error: ${error.message}` 
      }]);
    }
  };

  return {
    status,
    qaStatus,
    messages,
    emailPromptVisible,
    currentQuery,
    email,
    handleFileUpload,
    handleQuerySubmit,
    handleEmailSubmit,
    setEmail,
    setCurrentQuery
  };
};

export default useCustomerServiceAI;