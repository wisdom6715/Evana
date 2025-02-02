import { useState } from 'react';
import axios from 'axios';

// Define types for the summary and query types
interface QueryTypes {
  [key: string]: number;
}

interface DailySummary {
  total_interactions?: number;
  ai_handled?: number;
  human_handled?: number;
  unique_customers?: number;
  avg_confidence?: number;
  peak_hour?: number | null;
  query_types?: QueryTypes;
}

interface UseAnalyticsReturn {
  summary: DailySummary | null;
  queryTypes: QueryTypes | null;
  loading: boolean;
  error: string | null;
  fetchDailySummary: (companyId: string, date?: string) => Promise<void>;
  exportPDF: (companyId: string, date?: string) => Promise<void>;
}

// Base URL for API calls (can be configured)
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export const useDailyAnalytics = (): UseAnalyticsReturn => {
  const [summary, setSummary] = useState<DailySummary | null>(null);
  const [queryTypes, setQueryTypes] = useState<QueryTypes | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDailySummary = async (companyId: string, date?: string): Promise<void> => {
    // Use today's date if no date is provided
    const selectedDate = date || new Date().toISOString().split('T')[0];

    // Reset previous state
    setLoading(true);
    setError(null);
    setSummary(null);
    setQueryTypes(null);

    try {
      const response = await axios.get(`${BASE_URL}/analytics/daily/${companyId}`, {
        params: { date: selectedDate },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const fetchedSummary = response.data.summary;
      
      if (fetchedSummary) {
        setSummary(fetchedSummary);
        setQueryTypes(fetchedSummary.query_types || null);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = async (companyId: string, date?: string): Promise<void> => {
    // Use today's date if no date is provided
    const selectedDate = date || new Date().toISOString().split('T')[0];

    try {
      // Create URL with query parameters
      const params = new URLSearchParams({
        start_date: selectedDate,
        end_date: selectedDate
      });
      
      const url = `${BASE_URL}/export/pdf/${companyId}?${params}`;
      
      // Trigger file download
      window.location.href = url;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
    }
  };

  // Helper function to format numbers (similar to original implementation)
  const formatNumber = (num?: number | null): string => {
    if (num === null || num === undefined) return '-';
    if (typeof num === 'number') {
      if (Math.round(num) === num) return num.toLocaleString();
      return num.toFixed(1);
    }
    return String(num);
  };

  return {
    summary,
    queryTypes,
    loading,
    error,
    fetchDailySummary,
    exportPDF
  };
};