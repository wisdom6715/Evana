import { useState } from "react";

const API_BASE_URL = "http://localhost:5001"; // Change this if needed

export const useFileUpload = () => {
  const [message, setMessage] = useState<string>(""); // Upload success message
  const [error, setError] = useState<string>(""); // Upload error message
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  /**
   * Uploads a file for the provided companyId.
   *
   * @param companyId - The company ID string.
   * @param file - The file to upload.
   */
  const uploadFile = async (companyId: string, file: File): Promise<void> => {
    // Clear previous messages
    setMessage("");
    setError("");
    setIsLoading(true); // Start loading

    if (!companyId || !file) {
      setError("Company ID and file are required!");
      setIsLoading(false);
      return;
    }

    // Prepare the form data
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_BASE_URL}/fileUpload/${companyId}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setIsLoading(false); // Stop loading

      if (response.ok) {
        setMessage(
          `File uploaded successfully!`
        );
      } else {
        setError(data.error || "Something went wrong!");
      }
    } catch (err: any) {
      setIsLoading(false); // Stop loading
      setError("Error: " + err.message);
    }
  };

  return { message, error, isLoading, uploadFile };
};