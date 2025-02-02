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

    const headerScript = `<meta http-equiv="Content-Security-Policy" content="default-src 'self' data:;">`;

    const iframeCode = `<iframe
    src= https://www.chatbase.co/chatbot-iframe/${company?.company_id}
    width="100%"
    style="height: 100%; min-height: 700px"
    frameborder="0"
  ></iframe>`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };
  return (
    <div className='bg-white p-2 flex flex-col gap-5 border border-zinc-200 w-[70%] h-[95%]'>
        <div className='bg-gray-200 h-14 flex items-center justify-center '>
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
                    <div className='flex flex-col gap-3'>
                        <p>Paste this script in the header of your HTML</p>
                        <pre className='px-5 py-2 flex flex-col gap-3  bg-gray-200'>
                            <div className='flex flex-row items-center justify-between'>
                                <p>Header Tag</p>
                                <button
                                    onClick={() => copyToClipboard(headerScript)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontSize: '14px',
                                        color: '#4b5563',
                                        cursor: 'pointer',
                                        border: 'none',
                                        background: 'none',
                                    }}
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{ fill: 'currentColor' }}>
                                        <path d="m16,18.5v1c0,2.481-2.019,4.5-4.5,4.5h-7c-2.481,0-4.5-2.019-4.5-4.5v-7c0-2.481,2.019-4.5,4.5-4.5h1c.276,0,.5.224.5.5s-.224.5-.5.5h-1c-1.93,0-3.5,1.57-3.5,3.5v7c0,1.93,1.57,3.5,3.5,3.5h7c1.93,0,3.5-1.57,3.5-3.5v-1c0-.276.224-.5.5-.5s.5.224.5.5Zm8-14v7c0,2.481-2.019,4.5-4.5,4.5h-7c-2.481,0-4.5-2.019-4.5-4.5v-7c0-2.481,2.019-4.5,4.5-4.5h7c2.481,0,4.5,2.019,4.5,4.5Zm-1,0c0-1.93-1.57-3.5-3.5-3.5h-7c-1.93,0-3.5,1.57-3.5,3.5v7c0,1.93,1.57,3.5,3.5,3.5h7c1.93,0,3.5-1.57,3.5-3.5v-7Z"/>
                                    </svg>
                                    <span>Copy</span>
                                </button>
                            </div>
                            <code>
                                {headerScript}
                            </code>
                        </pre>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <p>Paste this iframe code in anywhere in the page you want the chatbot to be </p>
                        <pre className='px-5 py-2 flex flex-col gap-3 bg-gray-200'>
                            <div className='flex flex-row items-center justify-between'>
                                <p>Iframe Tag</p>
                                <button
                                    onClick={() => copyToClipboard(iframeCode)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontSize: '14px',
                                        color: '#4b5563',
                                        cursor: 'pointer',
                                        border: 'none',
                                        background: 'none',
                                    }}
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{ fill: 'currentColor' }}>
                                        <path d="m16,18.5v1c0,2.481-2.019,4.5-4.5,4.5h-7c-2.481,0-4.5-2.019-4.5-4.5v-7c0-2.481,2.019-4.5,4.5-4.5h1c.276,0,.5.224.5.5s-.224.5-.5.5h-1c-1.93,0-3.5,1.57-3.5,3.5v7c0,1.93,1.57,3.5,3.5,3.5h7c1.93,0,3.5-1.57,3.5-3.5v-1c0-.276.224-.5.5-.5s.5.224.5.5Zm8-14v7c0,2.481-2.019,4.5-4.5,4.5h-7c-2.481,0-4.5-2.019-4.5-4.5v-7c0-2.481,2.019-4.5,4.5-4.5h7c2.481,0,4.5,2.019,4.5,4.5Zm-1,0c0-1.93-1.57-3.5-3.5-3.5h-7c-1.93,0-3.5,1.57-3.5,3.5v7c0,1.93,1.57,3.5,3.5,3.5h7c1.93,0,3.5-1.57,3.5-3.5v-7Z"/>
                                    </svg>
                                    <span>Copy</span>
                                </button>
                            </div>
                            <code>
                                {iframeCode}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <p>N.B: Please check out our tutorials on Youtube</p>
            <ul>
                <li><a href="">HTML and React</a></li>
                <li><a href="">NextJs and other Frameworks</a></li>
                <li><a href="">WordPress, Wix and webflow</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Tutorial