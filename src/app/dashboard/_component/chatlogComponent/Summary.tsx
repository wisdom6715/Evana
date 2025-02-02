import React, { useEffect } from 'react';
import { getDatabase, ref, set, serverTimestamp } from 'firebase/database';

interface SummaryProps {
  setSelectedDate: (date: string) => void;
  handleExportPDF: () => void;
  handleFetchSummary: () => void;
  summary?: {
    total_interactions?: number;
    unique_customers?: number;
    ai_handled?: number;
    human_handled?: number;
  };
  queryTypes?: Record<string, number>;
  loading?: boolean;
  error?: string | null;
}

const Summary: React.FC<SummaryProps> = ({
  setSelectedDate,
  handleExportPDF,
  handleFetchSummary,
  summary,
  queryTypes,
  loading,
  error,
}) => {
  const database = getDatabase();

  // Function to log metrics to Firebase
  const logMetricsToDatabase = async () => {
    if (summary) {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      try {
        await set(ref(database, `daily_metrics/${today}`), {
          total_interactions: summary.total_interactions || 0,
          unique_customers: summary.unique_customers || 0,
          ai_handled: summary.ai_handled || 0,
          human_handled: summary.human_handled || 0,
          timestamp: serverTimestamp(),
        });
        console.log('Metrics logged successfully');
      } catch (error) {
        console.error('Error logging metrics:', error);
      }
    }
  };

  useEffect(() => {
    handleFetchSummary();
    if (summary) {
      logMetricsToDatabase();
    }
  }, [summary]);

  return (
    <div className="w-full bg-white flex justify-center items-center">
      <div className="w-[90%] h-[95%] bg-white grid-rows-[4%_96%] grid gap-1">
        <div className="bg-[#f1f1f3] flex items-center pl-2 border border-gray-200">
          <h1>Chatlog Summary</h1>
        </div>
        <div className="border h-[100%] border-[#e6e6e6]">
          <div className="w-full h-full">
            <div className="px-2 h-12 bg-[#f1f1f3] flex justify-between items-center">
              <input
                type="date"
                className="h-12 bg-[#f1f1f3]"
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <button
                onClick={handleExportPDF}
                className="flex space-x-2 flex-row items-center bg-green-500 text-white px-3 py-1 rounded"
              >
                <p>Export PDF</p>
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20" fill='white'>
                    <path d="M17.974,7.146c-.332-.066-.603-.273-.742-.569-1.552-3.271-5.143-5.1-8.735-4.438-3.272,.6-5.837,3.212-6.384,6.501-.162,.971-.15,1.943,.033,2.89,.06,.309-.073,.653-.346,.901-1.145,1.041-1.801,2.524-1.801,4.07,0,3.032,2.467,5.5,5.5,5.5h11c4.136,0,7.5-3.364,7.5-7.5,0-3.565-2.534-6.658-6.026-7.354Zm-1.474,12.854H5.5c-1.93,0-3.5-1.57-3.5-3.5,0-.983,.418-1.928,1.146-2.59,.786-.715,1.155-1.773,.963-2.763-.138-.712-.146-1.445-.024-2.181,.403-2.422,2.365-4.421,4.771-4.862,.385-.07,.768-.104,1.145-.104,2.312,0,4.406,1.289,5.422,3.434,.414,.872,1.2,1.481,2.158,1.673,2.559,.511,4.417,2.778,4.417,5.394,0,3.032-2.467,5.5-5.5,5.5Zm-1.379-6.707c.391,.391,.391,1.023,0,1.414l-2.707,2.707c-.387,.387-.896,.582-1.405,.584l-.009,.002-.009-.002c-.509-.002-1.018-.197-1.405-.584l-2.707-2.707c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l1.707,1.707v-5c0-.553,.448-1,1-1s1,.447,1,1v5l1.707-1.707c.391-.391,1.023-.391,1.414,0Z"/>
                </svg>
              </button>
            </div>
            <div className="pt-5 pl-16 pr-16 h-[calc(100%-3rem)]">
              {loading && <p>Loading...</p>}

              {error && <div className="text-red-500 mb-4">{error}</div>}

              {summary && (
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: 'Total Interactions', value: summary.total_interactions },
                    { title: 'AI Handled', value: summary.ai_handled },
                    { title: 'Human Handled', value: summary.human_handled },
                    { title: 'Unique Customers', value: summary.unique_customers },
                  ].map(({ title, value }) => (
                    <div key={title} className="bg-gray-100 p-4 rounded">
                      <h3 className="text-sm text-gray-600">{title}</h3>
                      <p className="text-lg font-bold">
                        {typeof value === 'number' ? value.toLocaleString() : value || '-'}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {queryTypes && Object.keys(queryTypes).length > 0 && (
                <div className='mt-6'>
                  <h2 className='text-xl font-semibold mb-4'>Query Types</h2>
                  <table className='w-full'>
                    <thead>
                      <tr className='bg-gray-100'>
                        <th className='text-left p-2'>Type</th>
                        <th className='text-right p-2'>Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(queryTypes).map(([type, count]) => (
                        <tr key={type} className='border-b'>
                          <td className='p-2'>{type || 'Unspecified'}</td>
                          <td className='p-2 text-right'>{count.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {!loading && !summary && !error && (
                <p className="text-gray-500 text-center">No data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;