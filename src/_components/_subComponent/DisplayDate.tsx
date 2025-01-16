import React from "react";

interface DisplayDateProps {
  daysToAdd?: number; // Optional prop to modify the date by adding days
  className?: string
}

const DisplayDate: React.FC<DisplayDateProps> = ({ daysToAdd = 0, className }) => {
  // Get the current date
  const currentDate: Date = new Date();

  // Modify the date by adding `daysToAdd` days
  const modifiedDate: Date = new Date(currentDate);
  modifiedDate.setDate(currentDate.getDate() + daysToAdd);

  // Format the date (e.g., Dec 12, 2024)
  const formattedDate: string = modifiedDate.toLocaleDateString("en-US", {
    month: "short", // Short month format (e.g., "Dec")
    day: "numeric", // Numeric day (e.g., "12")
    year: "numeric", // Full year (e.g., "2024")
  });

  return (
    <div className={className} style={{ color: "black", fontWeight: 400 }}>
      {formattedDate}
    </div>
  );
};

export default DisplayDate;