'use client'
import React, { useState, useEffect } from 'react';

const DateComponent: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    const formattedDate = now.toLocaleDateString('en-US', options);
    setCurrentDate(formattedDate);
  }, []);

  return <div>{currentDate}</div>;
};

export default DateComponent;