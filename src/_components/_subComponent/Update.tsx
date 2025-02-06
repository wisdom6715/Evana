import React, { useRef } from "react";
import useBroadcastManagement from '@/hook/useBroadcast'; // Import the custom hook

const BroadCastUpdate = () => {
  const {
    broadcastText,
    broadcastImage,
    handleTextChange,
    handleFileChange,
    sendBroadcast
  } = useBroadcastManagement(); // Use the custom hook

  // Reference for the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Open file picker programmatically
  const openFileExplorer = () => {
    fileInputRef.current?.click(); // Trigger the file input programmatically
  };

  return (
    <div
      className="border-t bg-white w-full h-full"
      style={{ display: "grid", gridTemplateRows: "5% 92%", gap: "3%" }}
    >
      <div className="flex flex-row items-center justify-between bg-white">
        <p>Broadcast</p>
        <p onClick={sendBroadcast} className="cursor-pointer px-2 py-1 bg-black text-white">Post</p>
      </div>
      <div style={{ display: "grid", gridTemplateRows: "85% 15%" }}>
        <div className="w-full flex items-center justify-center  border border-dashed" onClick={openFileExplorer}>
          {/* File input hidden */}
          <input
            ref={fileInputRef} // Assigning the ref to the input element
            type="file"
            className="w-full"
            style={{ display: "none" }} // Hides the file input
            onChange={handleFileChange} // Trigger the file change handler
          />

          {/* Display the image uploaded */}
          <div className="mt-3 border border-dashed">
            {broadcastImage ? (
              <img
                src={URL.createObjectURL(broadcastImage)}
                alt="Uploaded preview"
                className="w-32 h-32 object-cover" // Adjust size and styling as needed
              />
            ) : (
              <p>Click to upload an image</p> // Placeholder text when no image is uploaded
            )}
          </div>
        </div>
        {/* Broadcast message */}
        <textarea
          placeholder="Enter broadcast message..."
          value={broadcastText}
          onChange={handleTextChange}
          className="w-full bg-gray-50 border"
        />
      </div>
    </div>
  );
};

export default BroadCastUpdate;