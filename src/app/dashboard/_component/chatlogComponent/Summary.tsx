import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './styles/chatlog.module.css'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
type summaryType = {
  analysis: string;
};

const Summary = () => {
  const [filterType, setFilterType] = useState('Daily');
  const [startDate, setStartDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<summaryType>({ analysis: '' });

  function standardizeDateValue(rawDate: string, filterType: string) {
    // Ensure it's in "YYYY-MM-DD" format
    if (!rawDate) return "";

    const formattedDate = rawDate.trim();

    if (filterType === "monthly") {
      return formattedDate.slice(0, 7); // Get "YYYY-MM" for monthly filtering
    }

    return formattedDate; // Return as "YYYY-MM-DD" (daily & weekly)
  }

  const handleGetSummary = async () => {
    const company_id = 'b0c2997a-9cea-454b-bcb1-f4709055713a';
    const filterValue = standardizeDateValue(startDate, filterType);

    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5001/chatlog/${company_id}?filterType=${filterType}&filterValue=${filterValue}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Make sure to update the state with an object as expected
      setSummary({ analysis: data.summary.analysis });
      console.log(data.summary.analysis);
    } catch (error: any) {
      console.error("❌ Fetch error:", error);
      alert("❌ Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetSummary();
  }, [filterType, startDate]);

    // This function converts the styled content into a PDF.
    const downloadPDF = async () => {
      const element = document.getElementById('reportContent');
      if (!element) return;
  
      try {
        // Increase scale for better resolution if needed.
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
  
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
  
        // Calculate the height based on the image's dimensions to maintain aspect ratio.
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pdfWidth;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
  
        // If the image is taller than the page, you might need to add extra pages.
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('report.pdf');
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Error generating PDF");
      }
    };

  return (
    <div className="w-full h-[100vh] bg-white flex justify-center items-center">
      <div className='w-[80%] h-[95%] border grid grid-rows-[5%_95%]'>
        <div className='flex flex-row items-center justify-between px-5 py-1 bg-gray-50 border border-gray-100'>
          <div className='flex flex-row gap-2'>
            <select name="" id="" onChange={(e) => setFilterType(e.target.value)}>
              <option value="month">Daily(select date)</option>
              <option value="weekly">Weekly(select start date)</option>
              <option value="monthly">Monthly(select month)</option>
            </select>
            <input type="date" onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <button className='flex flex-row items-center p-1 gap-3 bg-green-500 rounded-sm ' onClick={downloadPDF}>
            <p className='text-white'>Export</p>
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" fill="white" viewBox="0 0 24 24" width="20" height="20">
              <path d="M17.974,7.146c-.332-.066-.603-.273-.742-.569-1.552-3.271-5.143-5.1-8.735-4.438-3.272,.6-5.837,3.212-6.384,6.501-.162,.971-.15,1.943,.033,2.89,.06,.309-.073,.653-.346,.901-1.145,1.041-1.801,2.524-1.801,4.07,0,3.032,2.467,5.5,5.5,5.5h11c4.136,0,7.5-3.364,7.5-7.5,0-3.565-2.534-6.658-6.026-7.354Zm-1.474,12.854H5.5c-1.93,0-3.5-1.57-3.5-3.5,0-.983,.418-1.928,1.146-2.59,.786-.715,1.155-1.773,.963-2.763-.138-.712-.146-1.445-.024-2.181,.403-2.422,2.365-4.421,4.771-4.862,.385-.07,.768-.104,1.145-.104,2.312,0,4.406,1.289,5.422,3.434,.414,.872,1.2,1.481,2.158,1.673,2.559,.511,4.417,2.778,4.417,5.394,0,3.032-2.467,5.5-5.5,5.5Zm-1.379-6.707c.391,.391,.391,1.023,0,1.414l-2.707,2.707c-.387,.387-.896,.582-1.405,.584l-.009,.002-.009-.002c-.509-.002-1.018-.197-1.405-.584l-2.707-2.707c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l1.707,1.707v-5c0-.553,.448-1,1-1s1,.447,1,1v5l1.707-1.707c.391-.391,1.023-.391,1.414,0Z" />
            </svg>
          </button>
        </div>
        <div className='w-full h-[100%] bg-gray-100 flex flex-col items-center justify-center'>
          <div id='reportContent' className={styles.markdown}>
            {/* Render the markdown analysis  */}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {summary.analysis}
            </ReactMarkdown>
            {isLoading && (
              <div className="flex justify-center items-center h-full big-theme">
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