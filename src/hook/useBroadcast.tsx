import { useState, useEffect } from 'react';

const useBroadcastManagement = () => {
  // States to handle the company ID, broadcast text, and image file
  const [broadcastText, setBroadcastText] = useState<string>('');
  const [broadcastImage, setBroadcastImage] = useState<File | null>(null);
  const [broadcasts, setBroadcasts] = useState<any[]>([]);

  // Handle text change for the broadcast message
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBroadcastText(e.target.value);
  };

  // Handle file input change for the image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setBroadcastImage(e.target.files[0]);
    }
  };
  const companyId = 'b0c2997a-9cea-454b-bcb1-f4709055713a'

  // Fetch broadcasts based on company ID
  const fetchBroadcasts = async () => {
    if (!companyId) {
      alert("❌ Please enter a Company ID to fetch broadcasts!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/broadcast/${companyId}`);
      const data = await response.json();

      if (data?.data?.length) {
        setBroadcasts(data.data);
      } else {
        setBroadcasts([]);
        alert("❌ No announcements yet.");
      }
    } catch (error) {
      console.error("❌ Fetch Broadcasts Error:", error);
      alert("❌ Error fetching broadcasts.");
    }
  };

  // Send the broadcast message and image
  const sendBroadcast = async () => {
    if (!companyId) {
      alert("❌ Please enter a Company ID!");
      return;
    }

    const formData = new FormData();
    formData.append("company_id", companyId);
    if (broadcastText) formData.append("text", broadcastText);
    if (broadcastImage) formData.append("image", broadcastImage);

    try {
      const response = await fetch("http://localhost:5001/broadcast", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert("✅ Broadcast sent successfully!");

      fetchBroadcasts(); // Refresh the broadcast list
      setBroadcastText("")
      setBroadcastImage(null);
    } catch (error) {
      console.error("❌ Broadcast error:", error);
      alert("❌ Error sending broadcast.");
    }
  };

  // Fetch broadcasts on component mount or when companyId changes
  useEffect(() => {
    if (companyId) {
      fetchBroadcasts();
    }
  }, [companyId]);

  return {
    companyId,
    broadcastText,
    broadcastImage,
    broadcasts,
    setBroadcastText,
    setBroadcastImage,
    handleTextChange,
    handleFileChange,
    sendBroadcast,
  };
};

export default useBroadcastManagement;