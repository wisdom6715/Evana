import React, { useRef } from "react";
import useBroadcastManagement from '@/hook/useBroadcast';
import Image from "next/image";
import { PopFunction } from "./usePopUp";

const BroadCastUpdate = () => {
  const {
    isSuccess,
    broadcastText,
    broadcastImage,
    handleTextChange,
    handleFileChange,
    sendBroadcast
  } = useBroadcastManagement();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileExplorer = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="border-t bg-white w-full h-full flex flex-col gap-3">
      {isSuccess &&(
        <PopFunction message={isSuccess} type="success" duration={4000}/>
      )
      }
      <div className="flex flex-row items-center justify-between bg-white p-4">
        <p className="font-medium">Broadcast</p>
        <button 
          onClick={sendBroadcast} 
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
          Post
        </button>
      </div>
      
      <div className="flex flex-col flex-grow">
        <div 
          className="flex-grow flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
          onClick={openFileExplorer}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="flex flex-col items-center p-6">
            {broadcastImage ? (
              <div className="relative w-64 h-64">
                <Image
                  src={URL.createObjectURL(broadcastImage)}
                  alt="Uploaded preview"
                  className="object-contain"
                  height={300}
                  width={250}
                />
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-500">Click to upload an image</p>
                <p className="text-sm text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
              </div>
            )}
          </div>
        </div>
        
        <textarea
          placeholder="Enter broadcast message..."
          value={broadcastText}
          onChange={handleTextChange}
          className="mt-4 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg resize-none h-32 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
        />
      </div>
    </div>
  );
};

export default BroadCastUpdate;