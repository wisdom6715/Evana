import React, {useState, useEffect} from 'react';
import { auth } from '@/lib/firebaseConfig';
import useCompany from '@/services/fetchComapnyData';
import { onAuthStateChanged } from 'firebase/auth';
const Tutorial = () => {
    const [user, setUser] = useState(auth.currentUser);
    const [company_Id, setCompany_Id] = useState<string | null>(null)
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
      return () => unsubscribe();
    }, []);
  
     useEffect(()=>{
        setCompany_Id(localStorage.getItem('companyId'))
     },[])
    const { company } = useCompany({
      userId: user?.uid,
      companyId: company_Id!
    });

    const iframeCode = `
    (function(){const c=document.createElement('div');c.id='chatbot-container';const f=document.createElement('iframe');f.src='http://localhost:5001/iframe/${company?.company_id}/';f.id='chatbot-frame';f.setAttribute('frameborder','0');
        const s=document.createElement('style');s.textContent='#chatbot-container{position:fixed;bottom:20px;right:10px;width:400px;height:90%;z-index:999999}#chatbot-frame{width:100%;height:100%;border:none}@media screen and (max-width:480px){#chatbot-container{width:100%;height:100%;right:0;bottom:0;border-radius:0}}';document.head.appendChild(s);
      c.appendChild(f);document.body.appendChild(c);})();`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };
  return (
    <div className='bg-white p-2 flex flex-col gap-5 border border-zinc-200 w-[70%] h-[95%]'>
        <div className='bg-[#f9f9f9] h-14 flex items-center justify-center '>
            <h1 className='text-lg font-bold'>Integration Help</h1>
        </div>
        
        <div className='flex flex-col gap-5'>
            <div>
                <h2>Introduction</h2>
                <p>Welcome to the API Help Section. This guide will help you integrate and use our API effectively. Explore step-by-step guide and troubleshooting tips to get started.</p>
            </div>
            {/* Add more sections as needed */}
            <div className='flex flex-col gap-5'>
                <h2>Getting Started</h2>
                <div className='flex flex-col gap-7'>
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
            </div>
        </div>
        <div>
            <p>N.B: Please check out our tutorials on Youtube</p>
            <ul>
                <li className='text-red-500'><a href="">HTML and React</a></li>
                <li className='text-red-500'><a href="">NextJs and other Frameworks</a></li>
                <li className='text-red-500'><a href="">WordPress, Wix and webflow</a></li>
            </ul>
            <div className='text-blue-500'><a href="https://wa.me/09024531295">Reach out to us quickly on wWhatsApp for help</a></div>
        </div>
    </div>
  )
}

export default Tutorial