import { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';

interface ChatInteraction {
  date: string;
  count: number;
}

interface ChatData {
  labels: string[];
  counts: number[];
}

interface UseChartInteractionsReturn {
  chartData: ChatData;
  isLoading: boolean;
  error: string | null;
}

export const useChartInteractions = (companyId: string): UseChartInteractionsReturn => {
  const [chartData, setChartData] = useState<ChatData>({ labels: [], counts: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!companyId) {
        setError('Company ID is required');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const endDate = new Date();
        const startDate = subDays(endDate, 14); // Get last 15 days

        const response = await fetch(`http://localhost:5001/chatlog/${companyId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startDate: format(startDate, 'yyyy-MM-dd'),
            endDate: format(endDate, 'yyyy-MM-dd')
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch chat data');
        }

        const data = await response.json();
        
        // Process the data for the last 15 days
        const processedData = processFifteenDaysData(data, startDate, endDate);
        setChartData(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [companyId]);

  return { chartData, isLoading, error };
};

// Helper function to process data for exactly 15 days
const processFifteenDaysData = (
  data: any, 
  startDate: Date, 
  endDate: Date
): ChatData => {
  const labels: string[] = [];
  const counts: number[] = [];

  // Create a map of existing data
  const dataMap = new Map<string, number>();
  if (data.dailyCounts) {
    data.dailyCounts.forEach((item: ChatInteraction) => {
      dataMap.set(item.date, item.count);
    });
  }

  // Fill in all 15 days, using 0 for days without data
  let currentDate = startDate;
  while (currentDate <= endDate) {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    const label = format(currentDate, 'MMM dd');
    
    labels.push(label);
    counts.push(dataMap.get(dateStr) || 0);
    
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }

  return { labels, counts };
};