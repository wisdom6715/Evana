import React, {useState, useEffect} from 'react';
import { auth } from '@/lib/firebaseConfig';
import useCompany from '@/services/fetchComapnyData';
import { onAuthStateChanged } from 'firebase/auth';

interface CodeBlockProps {
  code: string;
  lineNumbers?: boolean;
}

const Integration = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false); // Set loading to false once we have the auth state
    });
    return () => unsubscribe();
  }, []);

   const company_Id = localStorage.getItem('companyId');
  const { company } = useCompany({
    userId: user?.uid,
    companyId: company_Id!
  });
  console.log(user?.uid, user?.displayName)
  const iframeCode = `(function(){const c=document.createElement('div');c.id='chatbot-container';const f=document.createElement('iframe');f.src='http://localhost:5001/iframe/${company?.company_id}/';f.id='chatbot-frame';f.setAttribute('frameborder','0');
        const s=document.createElement('style');s.textContent='#chatbot-container{position:fixed;bottom:20px;right:10px;width:400px;height:90%;z-index:999999}#chatbot-frame{width:100%;height:100%;border:none}@media screen and (max-width:480px){#chatbot-container{width:100%;height:100%;right:0;bottom:0;border-radius:0}}';document.head.appendChild(s);
      c.appendChild(f);document.body.appendChild(c);})();`;

  if(authLoading){
    return(
      <div className="w-full h-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div style={{ 
      padding: '24px', 
      maxWidth: '64rem', 
      margin: '0 auto' 
    }}>
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        marginBottom: '16px' 
      }}>
        Integration
      </h2>
      <p style={{   color: '#4b5563',   marginBottom: '24px' }}>
        To integrate Evana into your website, copy the JavaScript code below and paste into the script tag of your website's HTML.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '8px 16px',backgroundColor: '#f9fafb',borderBottom: '1px solid #e5e7eb'}}>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>
              www.intuitionlabs.com.ng
            </span>
            <button onClick={() => copyToClipboard(iframeCode)}style={{display: 'flex',alignItems: 'center',gap: '8px',fontSize: '14px',color: '#4b5563',cursor: 'pointer',border: 'none',background: 'none'}}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{ fill: 'currentColor' }}>
                <path d="m16,18.5v1c0,2.481-2.019,4.5-4.5,4.5h-7c-2.481,0-4.5-2.019-4.5-4.5v-7c0-2.481,2.019-4.5,4.5-4.5h1c.276,0,.5.224.5.5s-.224.5-.5.5h-1c-1.93,0-3.5,1.57-3.5,3.5v7c0,1.93,1.57,3.5,3.5,3.5h7c1.93,0,3.5-1.57,3.5-3.5v-1c0-.276.224-.5.5-.5s.5.224.5.5Zm8-14v7c0,2.481-2.019,4.5-4.5,4.5h-7c-2.481,0-4.5-2.019-4.5-4.5v-7c0-2.481,2.019-4.5,4.5-4.5h7c2.481,0,4.5,2.019,4.5,4.5Zm-1,0c0-1.93-1.57-3.5-3.5-3.5h-7c-1.93,0-3.5,1.57-3.5,3.5v7c0,1.93,1.57,3.5,3.5,3.5h7c1.93,0,3.5-1.57,3.5-3.5v-7Z"/>
              </svg>
              <span>Copy</span>
            </button>
          </div>
          <pre className='px-5 py-2 flex flex-col gap-3 bg-[#f9f9f9] overflow-x-hidden'>
            <code className='px-5 py-2 flex flex-col gap-3 bg-[#f9f9f9] overflow-x-scroll'>
                {iframeCode}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Integration;