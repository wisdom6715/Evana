import React, { useEffect, useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './styles/chatlog.module.css'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { auth } from '@/lib/firebaseConfig';
import useCompany from '@/services/fetchComapnyData';
import { onAuthStateChanged } from 'firebase/auth';

type SummaryType = {
  analysis: string;
};

const Summary = () => {
  const [filterType, setFilterType] = useState('daily');
  const [startDate, setStartDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<SummaryType>({ analysis: '' });
  const [user, setUser] = useState(auth.currentUser);
  const [inputType, setInputType] = useState('date');

  const standardizeDateValue = useCallback((rawDate: string, filterType: string) => {
    if (!rawDate) return "";

    const formattedDate = rawDate.trim();
    return filterType.toLowerCase() === "monthly" ? formattedDate.slice(0, 7) : formattedDate;
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const company_Id = localStorage.getItem('companyId');
  const { company } = useCompany({
    userId: user?.uid,
    companyId: company_Id!,
  });

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilterType = e.target.value;
    setFilterType(newFilterType);
    
    // Reset date when switching filter types
    setStartDate('');
    
    // Update input type based on filter selection
    if (newFilterType.toLowerCase() === 'monthly') {
      setInputType('month');
    } else {
      setInputType('date');
    }
  };

  const handleGetSummary = useCallback(async () => {
    if (!filterType || !startDate) return;

    const company_id = company?.company_id;
    const filterValue = standardizeDateValue(startDate, filterType);

    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5001/chatlog/${company_id}?filterType=${filterType}&filterValue=${filterValue}`
      );
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setSummary({ analysis: data.summary.analysis });
    } catch (error: any) {
      console.error("❌ Fetch error:", error);
      alert("❌ Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }, [filterType, startDate, standardizeDateValue, company?.company_id]);

  useEffect(() => {
    if (filterType && startDate) {
      handleGetSummary();
    }
  }, [filterType, startDate, handleGetSummary]);

  const downloadPDF = async () => {
    const element = document.getElementById('reportContent');
    if (!element) return;
    const originalStyles = {
      height: element.style.height,
      overflow: element.style.overflow,
      position: element.style.position
    };

    // Modify for capture
    element.style.height = 'auto';
    element.style.overflow = 'visible';
    element.style.position = 'relative';

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('report.pdf');
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF");
    }
    Object.assign(element.style, originalStyles);
  };

  return (
    <div className="w-full h-[100vh] bg-white flex justify-center items-center">
      <div className='w-[80%] h-[95%] border grid grid-rows-[5%_95%]'>
        <div className='flex flex-row items-center justify-between px-5 py-1 bg-gray-50 border border-gray-100'>
          <div className='flex flex-row gap-2'>
            <select 
              value={filterType}
              onChange={handleFilterTypeChange}
              className="border rounded px-2 py-1"
            >
              <option value="daily">Daily (select date)</option>
              <option value="weekly">Weekly (select start date)</option>
              <option value="monthly">Monthly (select month)</option>
            </select>
            <input 
              type={inputType}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <button 
            className='flex flex-row items-center py-1 px-3 gap-3 bg-green-500 rounded-sm hover:bg-green-600 transition-colors'
            onClick={downloadPDF}
          >
            <p className='text-white'>Export</p>
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" fill="white" viewBox="0 0 24 24" width="20" height="20">
              <path d="M17.974,7.146c-.332-.066-.603-.273-.742-.569-1.552-3.271-5.143-5.1-8.735-4.438-3.272,.6-5.837,3.212-6.384,6.501-.162,.971-.15,1.943,.033,2.89,.06,.309-.073,.653-.346,.901-1.145,1.041-1.801,2.524-1.801,4.07,0,3.032,2.467,5.5,5.5,5.5h11c4.136,0,7.5-3.364,7.5-7.5,0-3.565-2.534-6.658-6.026-7.354Zm-1.474,12.854H5.5c-1.93,0-3.5-1.57-3.5-3.5,0-.983,.418-1.928,1.146-2.59,.786-.715,1.155-1.773,.963-2.763-.138-.712-.146-1.445-.024-2.181,.403-2.422,2.365-4.421,4.771-4.862,.385-.07,.768-.104,1.145-.104,2.312,0,4.406,1.289,5.422,3.434,.414,.872,1.2,1.481,2.158,1.673,2.559,.511,4.417,2.778,4.417,5.394,0,3.032-2.467,5.5-5.5,5.5Zm-1.379-6.707c.391,.391,.391,1.023,0,1.414l-2.707,2.707c-.387,.387-.896,.582-1.405,.584l-.009,.002-.009-.002c-.509-.002-1.018-.197-1.405-.584l-2.707-2.707c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l1.707,1.707v-5c0-.553,.448-1,1-1s1,.447,1,1v5l1.707-1.707c.391-.391,1.023-.391,1.414,0Z" />
            </svg>
          </button>
        </div>
        <div className='w-full h-[100%] bg-gray-100 flex flex-col items-center justify-center'>
          <div id='reportContent' className={styles.markdown}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {summary.analysis}
            </ReactMarkdown>
            {isLoading && (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;