import { useState, useEffect } from 'react';

interface TrialData {
  startDate: string;
  endDate: string;
}

const useFreeTrial = (userId: string) => {
  const [isTrialActive, setIsTrialActive] = useState<boolean>(false);
  const [daysLeft, setDaysLeft] = useState<number>(0);

  useEffect(() => {
    const trialKey = `trial_${userId}`;
    const trialDataString = localStorage.getItem(trialKey);
    
    if (trialDataString) {
      const trialData: TrialData = JSON.parse(trialDataString);
      const trialEndDate = new Date(trialData.endDate);
      const currentDate = new Date();

      if (currentDate <= trialEndDate) {
        setIsTrialActive(true);
        setDaysLeft(Math.ceil((trialEndDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)));
      } else {
        setIsTrialActive(false);
        localStorage.removeItem(trialKey); // Remove expired trial data
      }
    } else {
      startTrial(trialKey);
    }
  }, [userId]);

  const startTrial = (trialKey: string) => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 7);

    const trialData: TrialData = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    localStorage.setItem(trialKey, JSON.stringify(trialData));
    setIsTrialActive(true);
    setDaysLeft(7);
  };

  const endTrial = () => {
    const trialKey = `trial_${userId}`;
    localStorage.removeItem(trialKey);
    setIsTrialActive(false);
    setDaysLeft(0);
  };

  return { isTrialActive, daysLeft, endTrial };
};

export default useFreeTrial;