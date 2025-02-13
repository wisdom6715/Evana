import styles from "@/_components/styles/chatStyle.module.css";
import { useFileUpload } from "@/hook/useFileUpload";
import customizeIcon from "@/app/assets/images/customize.png";
import ChatbotImage from "@/app/landingPage/_components/assets/images/AI.webp";
import Image from "next/image";
import React, { useState, useRef, useEffect } from 'react';
import { auth } from '@/lib/firebaseConfig';
import useCompany from '@/services/fetchComapnyData';
import { onAuthStateChanged } from 'firebase/auth';
import { PopFunction } from "./usePopUp";

interface SwitchFeatureProps {
  setSwitchFeature: React.Dispatch<React.SetStateAction<boolean>>; // Fix type here
}

const ChatProfile: React.FC<SwitchFeatureProps> = ({ setSwitchFeature }) => {
  const { message, isLoading, uploadFile } = useFileUpload(); // Hook for file upload

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      handleFileUpload(selectedFile); // Automatically upload the file after selection
    }
  };

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

  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the file input

  const handleFileUpload = (file: File) => {
    if (file && company?.company_id) {
      uploadFile(company?.company_id, file); // Call the uploadFile function
    } else {
      console.log("Please select a file and ensure companyId is available.");
    }
  };

  const openFileExplorer = () => {
    fileInputRef.current?.click(); // Trigger the file input programmatically
  };

  const toggleSwitchFeature = () => {
    setSwitchFeature(prev => !prev); // Use the function to toggle the value of switchFeature
  };

  return (
    <div className={styles.botContainer}>
      <Image className={styles.botImage} src={ChatbotImage} alt="AI Image" />
      <div className={styles.iconsContainer}>
        {message && (
          <PopFunction message={message} type="success" duration={60000} />
        )}
        {/* File upload icon which triggers the file explorer */}
        <div className={styles.icon} onClick={openFileExplorer}>
          <input
            type="file"
            style={{ display: "none" }} // Hides the file input
            ref={fileInputRef} // Associates the input with the ref
            onChange={handleFileChange} // Trigger file selection
          />
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path d="M17.974,7.146c-.331-.066-.602-.273-.742-.569-1.55-3.271-5.143-5.1-8.734-4.438-3.272,.6-5.837,3.212-6.384,6.501-.162,.971-.15,1.943,.033,2.89,.06,.309-.073,.653-.346,.901-1.145,1.041-1.801,2.524-1.801,4.07,0,3.032,2.467,5.5,5.5,5.5h11c4.136,0,7.5-3.364,7.5-7.5,0-3.565-2.534-6.658-6.026-7.354Zm-1.474,12.854H5.5c-1.93,0-3.5-1.57-3.5-3.5,0-.983,.418-1.928,1.146-2.59,.786-.715,1.155-1.773,.963-2.763-.138-.712-.146-1.445-.024-2.181,.403-2.422,2.365-4.421,4.771-4.862,.385-.07,.768-.104,1.146-.104,2.312,0,4.405,1.289,5.422,3.434,.413,.872,1.2,1.482,2.158,1.673,2.56,.511,4.417,2.779,4.417,5.394,0,3.032-2.468,5.5-5.5,5.5Zm-1.379-7.707c.391,.391,.391,1.023,0,1.414-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293l-1.707-1.707v5c0,.553-.448,1-1,1s-1-.447-1-1v-5l-1.707,1.707c-.391,.391-1.023,.391-1.414,0s-.391-1.023,0-1.414l2.707-2.707c.386-.386,.893-.58,1.4-.583l.014-.003,.014,.003c.508,.003,1.014,.197,1.4,.583l2.707,2.707Z" />
            </svg>
          )}
        </div>
        {company?.userData?.planType === "basic" ? (
          ""
        ) : (
          <button
            className={styles.icon}
            onClick={toggleSwitchFeature} // Use toggle function here
          >
            <Image alt="customize icon" src={customizeIcon} height={20} />
          </button>
        )}
        <div className={styles.icon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
            <g>
              <circle cx="256" cy="53.333" r="53.333" />
              <circle cx="256" cy="256" r="53.333" />
              <circle cx="256" cy="458.667" r="53.333" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatProfile;