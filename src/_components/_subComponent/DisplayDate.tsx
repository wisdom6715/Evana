// components/DisplayDate.tsx
import React from "react";

const DisplayDate: React.FC = () => {
  // Get the current date
  const currentDate: Date = new Date();

  // Format the date (e.g., Dec 12, 2024)
  const formattedDate: string = currentDate.toLocaleDateString("en-US", {
    month: "short", // Short month format (e.g., "Dec")
    day: "numeric", // Numeric day (e.g., "12")
    year: "numeric", // Full year (e.g., "2024")
  });

  return (
    <div style={{ fontSize: "1rem",  color: "#333" }}>
      {formattedDate}
    </div>
  );
};

export default DisplayDate;