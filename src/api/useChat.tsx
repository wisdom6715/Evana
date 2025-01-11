import { useState, useEffect } from 'react';
import axios from 'axios';
import useWebSocket from './initializeWebsocket';

const useQAForm = () => {
  const API_BASE_URL = 'http://localhost:5000/api'
  const [currentCustomerId, setCurrentCustomerId] = useState('');
  const [answer, setAnswer] = useState('');
  const {initializeWebSocket, websocket, connectionStatus} = useWebSocket(currentCustomerId,) //// currentQueryId still needs to be passed into the hook
  
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Generate unique customer ID
    const customerId = Date.now().toString();
    setCurrentCustomerId(customerId);

    // Gather form data
    const formData = new FormData(event.target);
    const data = {
      query: formData.get('query'),
      customer_id: customerId,
    };
    const company_id = formData.get('company_id');

    try {
      const response = await axios.post(`${API_BASE_URL}/ask/${company_id}`, data);

      if (response.data.status === 'success') {
        setAnswer(response.data.answer);
      } else if (response.data.status === 'waiting_agent') {
        let currentQueryId = response.data.notification_id;
        setAnswer('Connecting you with a customer service representative...');

        // Initialize WebSocket if not already connected
        if (!websocket || websocket.readyState !== WebSocket.OPEN) {
          initializeWebSocket();
        } else {
          // Send customer identification through existing WebSocket
          websocket.send(
            JSON.stringify({
              user_id: customerId,
              user_type: 'customer',
              company_id: company_id,
              query_id: currentQueryId,
            })
          );
        }
      } else {
        setAnswer(response.data.message);
      }
    } catch (error: any) {
      alert(`Query failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return {
    handleSubmit,
    answer,
    connectionStatus,
  };
};

export default useQAForm;
