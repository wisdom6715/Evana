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
  const iframeCode = `<iframe
    src= https://www.chatbase.co/chatbot-iframe/${company?.company_id}
    width="100%"
    style="height: 100%; min-height: 700px"
    frameborder="0"
  ></iframe>`;

  if(authLoading){
    return(
      <div className="w-full h-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  const headerScript = `<meta http-equiv="Content-Security-Policy" content="default-src 'self' https://chatbot-theta-vert.vercel.app/; frame-src https://chatbot-theta-vert.vercel.app/; script-src 'self' 'unsafe-inline' https://chatbot-theta-vert.vercel.app/; style-src 'self' 'unsafe-inline' https://chatbot-theta-vert.vercel.app/; img-src 'self' https://chatbot-theta-vert.vercel.app/ data:;">`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const CodeBlock: React.FC<CodeBlockProps> = ({ code, lineNumbers = true }) => (
    <div style={{ 
      backgroundColor: '#f9fafb', 
      borderRadius: '8px', 
      overflow: 'hidden' 
    }}>
      <div style={{ 
        fontFamily: 'monospace', 
        fontSize: '14px' 
      }}>
        {code.split('\n').map((line, index) => (
          <div key={index} style={{ display: 'flex' }}>
            {lineNumbers && (
              <div style={{
                color: '#9ca3af',
                width: '48px',
                textAlign: 'right',
                paddingRight: '16px',
                userSelect: 'none',
                borderRight: '1px solid #e5e7eb',
                backgroundColor: 'white',
              }}>
                {index + 1}
              </div>
            )}
            <div style={{
              padding: '10px 16px',
              flex: 1,
              whiteSpace: 'pre',
              overflowX: 'scroll'
            }}>
              {line}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
      <p style={{ 
        color: '#4b5563', 
        marginBottom: '24px' 
      }}>
        To integrate Intuitionlabs with your website, copy the following iframe code and header script to your website's HTML.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ 
          border: '1px solid #e5e7eb', 
          borderRadius: '8px', 
          overflow: 'hidden' 
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 16px',
            backgroundColor: '#f9fafb',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <span style={{ 
              fontSize: '14px', 
              fontWeight: '500' 
            }}>
              www.intuitionlabs.co
            </span>
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
                background: 'none'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{ fill: 'currentColor' }}>
                <path d="m16,18.5v1c0,2.481-2.019,4.5-4.5,4.5h-7c-2.481,0-4.5-2.019-4.5-4.5v-7c0-2.481,2.019-4.5,4.5-4.5h1c.276,0,.5.224.5.5s-.224.5-.5.5h-1c-1.93,0-3.5,1.57-3.5,3.5v7c0,1.93,1.57,3.5,3.5,3.5h7c1.93,0,3.5-1.57,3.5-3.5v-1c0-.276.224-.5.5-.5s.5.224.5.5Zm8-14v7c0,2.481-2.019,4.5-4.5,4.5h-7c-2.481,0-4.5-2.019-4.5-4.5v-7c0-2.481,2.019-4.5,4.5-4.5h7c2.481,0,4.5,2.019,4.5,4.5Zm-1,0c0-1.93-1.57-3.5-3.5-3.5h-7c-1.93,0-3.5,1.57-3.5,3.5v7c0,1.93,1.57,3.5,3.5,3.5h7c1.93,0,3.5-1.57,3.5-3.5v-7Z"/>
              </svg>
              <span>Copy</span>
            </button>
          </div>
          <CodeBlock code={iframeCode} />
        </div>

        <div style={{ 
          border: '1px solid #e5e7eb', 
          borderRadius: '8px', 
          overflow: 'hidden' 
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 16px',
            backgroundColor: '#f9fafb',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <span style={{ 
              fontSize: '14px', 
              fontWeight: '500' 
            }}>
              Header Script
            </span>
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
                background: 'none'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{ fill: 'currentColor' }}>
                <path d="m16,18.5v1c0,2.481-2.019,4.5-4.5,4.5h-7c-2.481,0-4.5-2.019-4.5-4.5v-7c0-2.481,2.019-4.5,4.5-4.5h1c.276,0,.5.224.5.5s-.224.5-.5.5h-1c-1.93,0-3.5,1.57-3.5,3.5v7c0,1.93,1.57,3.5,3.5,3.5h7c1.93,0,3.5-1.57,3.5-3.5v-1c0-.276.224-.5.5-.5s.5.224.5.5Zm8-14v7c0,2.481-2.019,4.5-4.5,4.5h-7c-2.481,0-4.5-2.019-4.5-4.5v-7c0-2.481,2.019-4.5,4.5-4.5h7c2.481,0,4.5,2.019,4.5,4.5Zm-1,0c0-1.93-1.57-3.5-3.5-3.5h-7c-1.93,0-3.5,1.57-3.5,3.5v7c0,1.93,1.57,3.5,3.5,3.5h7c1.93,0,3.5-1.57,3.5-3.5v-7Z"/>
              </svg>
              <span>Copy</span>
            </button>
          </div>
          <CodeBlock code={headerScript} />
        </div>
      </div>
    </div>
  );
};

export default Integration;