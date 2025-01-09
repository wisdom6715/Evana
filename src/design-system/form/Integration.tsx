import React from 'react';

const Integration = () => {
  const iframeCode = `<iframe
  src="https://www.chatbase.co/chatbot-iframe/ZGELHoFeKfpqQZGlrUUt9"
  width="100%"
  style="height: 100%; min-height: 700px"
  frameborder="0"
></iframe>`;

  const headerScript = `<meta http-equiv="Content-Security-Policy" content="default-src 'self' https://chatbot-theta-vert.vercel.app/; frame-src https://chatbot-theta-vert.vercel.app/; script-src 'self' 'unsafe-inline' https://chatbot-theta-vert.vercel.app/; style-src 'self' 'unsafe-inline' https://chatbot-theta-vert.vercel.app/; img-src 'self' https://chatbot-theta-vert.vercel.app/ data:;">`;

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className='p-5'>
      <h2 style={{fontSize: '1.5rem', fontWeight: '800'}}>Integration</h2>
      <div>
        <p>
          To integrate Chatbase with your website, copy the following iframe code and header script to your website's HTML file.
        </p>
        <div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '3rem', backgroundColor: 'yellow'}}>
            <h1>Embed</h1>
            <button onClick={() => copyToClipboard(iframeCode)} style={{display: 'flex', flexDirection: 'row'}}>
              <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="18" height="18">
                <path d="m16,18.5v1c0,2.481-2.019,4.5-4.5,4.5h-7c-2.481,0-4.5-2.019-4.5-4.5v-7c0-2.481,2.019-4.5,4.5-4.5h1c.276,0,.5.224.5.5s-.224.5-.5.5h-1c-1.93,0-3.5,1.57-3.5,3.5v7c0,1.93,1.57,3.5,3.5,3.5h7c1.93,0,3.5-1.57,3.5-3.5v-1c0-.276.224-.5.5-.5s.5.224.5.5Zm8-14v7c0,2.481-2.019,4.5-4.5,4.5h-7c-2.481,0-4.5-2.019-4.5-4.5v-7c0-2.481,2.019-4.5,4.5-4.5h7c2.481,0,4.5,2.019,4.5,4.5Zm-1,0c0-1.93-1.57-3.5-3.5-3.5h-7c-1.93,0-3.5,1.57-3.5,3.5v7c0,1.93,1.57,3.5,3.5,3.5h7c1.93,0,3.5-1.57,3.5-3.5v-7Z"/>
              </svg>
              <h1>Copy</h1>
            </button>
          </div>
          <textarea
            value={iframeCode}
            readOnly
            style={{ width: '100%', height: '200px', backgroundColor: 'grey' }}
          />
        </div>

        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '3rem', backgroundColor: 'yellow'}}>
            <h1>Embed</h1>
            <button onClick={() => copyToClipboard(headerScript)} style={{display: 'flex', flexDirection: 'row'}}>
              <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="18" height="18">
                <path d="m16,18.5v1c0,2.481-2.019,4.5-4.5,4.5h-7c-2.481,0-4.5-2.019-4.5-4.5v-7c0-2.481,2.019-4.5,4.5-4.5h1c.276,0,.5.224.5.5s-.224.5-.5.5h-1c-1.93,0-3.5,1.57-3.5,3.5v7c0,1.93,1.57,3.5,3.5,3.5h7c1.93,0,3.5-1.57,3.5-3.5v-1c0-.276.224-.5.5-.5s.5.224.5.5Zm8-14v7c0,2.481-2.019,4.5-4.5,4.5h-7c-2.481,0-4.5-2.019-4.5-4.5v-7c0-2.481,2.019-4.5,4.5-4.5h7c2.481,0,4.5,2.019,4.5,4.5Zm-1,0c0-1.93-1.57-3.5-3.5-3.5h-7c-1.93,0-3.5,1.57-3.5,3.5v7c0,1.93,1.57,3.5,3.5,3.5h7c1.93,0,3.5-1.57,3.5-3.5v-7Z"/>
              </svg>
              <h1>Copy</h1>
            </button>
          </div>
          <textarea
            value={headerScript}
            readOnly
            style={{ width: '100%', height: '100px', backgroundColor: 'grey' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Integration;