import React, {useState, useEffect} from 'react';
import { auth } from '@/lib/firebaseConfig';
import useCompany from '@/services/fetchComapnyData';
import { onAuthStateChanged } from 'firebase/auth';

const useBroadcastManagement = () => {
  // States to handle the company ID, broadcast text, and image file
  const [broadcastText, setBroadcastText] = useState<string>('');
  const [broadcastImage, setBroadcastImage] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState<string>('');

  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

   const company_Id = localStorage.getItem('companyId');
  const { company } = useCompany({
    userId: user?.uid,
    companyId: company_Id!
  });
  console.log(user?.uid, user?.displayName)

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

  // Send the broadcast message and image
  const sendBroadcast = async () => {
    if (!company?.company_id) {
      alert("❌ Please enter a Company ID!");
      return;
    }

    const formData = new FormData();
    formData.append("company_id", company?.company_id);
    if (broadcastText) formData.append("text", broadcastText);
    if (broadcastImage) formData.append("image", broadcastImage);

    try {
      const response = await fetch("http://localhost:5001/broadcast", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setIsSuccess('Broadcast sent successfully!')
      console.log("�� Broadcast sent:", data);

      setBroadcastText("")
      setBroadcastImage(null);
    } catch (error) {
      console.error("❌ Broadcast error:", error);
      alert("❌ Error sending broadcast.");
    }
  };


  return {
    broadcastText,
    isSuccess,
    broadcastImage,
    setBroadcastText,
    setBroadcastImage,
    handleTextChange,
    handleFileChange,
    sendBroadcast,
  };
};

export default useBroadcastManagement;