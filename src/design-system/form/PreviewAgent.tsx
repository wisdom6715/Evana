import React from 'react'
import Image from 'next/image';
import sampleLogo from '@/app/assets/images/favicon.png'
import ChatBotLogo from '@/app/landingPage/_components/assets/images/AI.webp'

type PreviewAgentProps = {
  logo: File | null;
  chatbotName: string;
  theme: string;
  welcomeMessage: string;
  fetchedData?: {
    ai_name?: string;
    welcome_message?: string;
    company_logo?: string;
    theme?: string;
  };
};

const PreviewAgent: React.FC<PreviewAgentProps> = ({ 
  logo, 
  chatbotName, 
  theme, 
  welcomeMessage,
  fetchedData 
}) => {
  // Use fetched data if available, otherwise use form data or defaults
  const displayName = fetchedData?.ai_name || chatbotName || 'Evana';
  const displayMessage = fetchedData?.welcome_message || welcomeMessage || "I'm here to help with questions about our services.";
  const displayTheme = fetchedData?.theme || theme;
  
  // Handle logo priority: new uploaded logo > fetched logo > sample logo
  const logoUrl = logo 
    ? URL.createObjectURL(logo) 
    : fetchedData?.company_logo 
      ? fetchedData.company_logo 
      : sampleLogo;

  return (
    <div style={{
      width: '65%', 
      height: '90%', 
      backgroundColor: 'transparent',
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateRows: '40% 60%'
      }}>
        <div style={{
          background: `linear-gradient(to bottom,${displayTheme} , #fffa)`,
          borderTopLeftRadius: '1.2rem',
          borderTopRightRadius: '1.2rem',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 5%',
          gap: '.5rem'
        }}>
          <div style={{
            width: '100%',
            height: '80%',
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'column',
          }}>
              <div style={{width: '100%', height: '80%', paddingTop: '2rem', backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Image width={30} height={30} style={{width: '2.5rem', height: '2.5rem', borderRadius: '50%', backgroundColor: 'blueviolet'}} src={logoUrl} alt="company's logo"/>
                  <div style={{width: '2.5rem', height: '2.5rem', borderRadius: '50%', backgroundColor: 'blueviolet'}}>
                    <Image width={30} height={30} style={{width: '2.5rem', height: '2.5rem', borderRadius: '50%', backgroundColor: 'blueviolet'}} src={ChatBotLogo} alt="AI's logo"/>
                  </div>
              </div>
              <div style={{paddingTop: '1rem'}}>
                  <h2 style={{color: 'white'}}>Hi, I'm {displayName}</h2>
                  <p style={{color: 'white', maxWidth: '15rem', }}>{displayMessage}</p>
            </div>
          </div>
          <div style={{
            width: '100%',
            height: '20%',
            backgroundColor: 'white',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            padding: '0px 10px',
            justifyContent:'space-between',
            border: '.1rem solid grey',
            borderRadius: '1rem',
            cursor: "pointer"
          }}> 
            <p>Send a message </p>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" fill="none" viewBox="0 0 17 16">
              <path fill="currentColor" d="m4.563 14.605 9.356-5.402c1-.577 1-2.02 0-2.598L4.563 1.203a1.5 1.5 0 0 0-2.25 1.3v10.803a1.5 1.5 0 0 0 2.25 1.3M6.51 8.387 2.313 9.512V6.297L6.51 7.42c.494.133.494.834 0 .966"></path>
            </svg>
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateRows: '83% 17%'
        }}>
          <div style={{
            backgroundColor: 'white',
            overflowY: 'scroll',
            padding: '.5rem 1rem'
          }}>
            <p style={{marginBottom: '1rem',}}>Updates</p>
            <div style={{marginBottom: '.5rem', width: '100%', height: '60%', backgroundColor: 'rebeccapurple'}}></div>
            <div style={{marginBottom: '.5rem', width: '100%', height: '60%', backgroundColor: 'rebeccapurple'}}></div>
            <div style={{marginBottom: '.5rem', width: '100%', height: '60%', backgroundColor: 'rebeccapurple'}}></div>
          </div>
          <div style={{
            width: '100%',
            borderBottomRightRadius: '1.2rem',
            borderBottomLeftRadius: '1.2rem',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            border: '.1rem solid rgb(201, 197, 197)'
          }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                  <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="18" height="18" fill="black">
                      <path d="M19,24H5c-2.757,0-5-2.243-5-5V9.724c0-1.665,.824-3.215,2.204-4.145L9.203,.855c1.699-1.146,3.895-1.146,5.594,0l7,4.724c1.379,.93,2.203,2.479,2.203,4.145v9.276c0,2.757-2.243,5-5,5ZM12,1.997c-.584,0-1.168,.172-1.678,.517L3.322,7.237c-.828,.558-1.322,1.487-1.322,2.486v9.276c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V9.724c0-.999-.494-1.929-1.321-2.486L13.678,2.514c-.51-.345-1.094-.517-1.678-.517Z"/>
                  </svg>
                  <p style={{fontSize: '.7rem'}}>Home</p>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                  <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="18" height="18" fill='black'>
                      <path d="m19,4h-1.101c-.465-2.279-2.485-4-4.899-4H5C2.243,0,0,2.243,0,5v12.854c0,.794.435,1.52,1.134,1.894.318.171.667.255,1.015.255.416,0,.831-.121,1.19-.36l2.95-1.967c.691,1.935,2.541,3.324,4.711,3.324h5.697l3.964,2.643c.36.24.774.361,1.19.361.348,0,.696-.085,1.015-.256.7-.374,1.134-1.1,1.134-1.894v-12.854c0-2.757-2.243-5-5-5ZM2.23,17.979c-.019.012-.075.048-.152.007-.079-.042-.079-.109-.079-.131V5c0-1.654,1.346-3,3-3h8c1.654,0,3,1.346,3,3v7c0,1.654-1.346,3-3,3h-6c-.327,0-.541.159-.565.175l-4.205,2.804Zm19.77,3.876c0,.021,0,.089-.079.131-.079.041-.133.005-.151-.007l-4.215-2.811c-.164-.109-.357-.168-.555-.168h-6c-1.304,0-2.415-.836-2.828-2h4.828c2.757,0,5-2.243,5-5v-6h1c1.654,0,3,1.346,3,3v12.854Z"/>
                  </svg>
                  <p style={{fontSize: '.7rem'}}>Messages</p>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                  <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18" fill="black">
                      <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"/><path d="M12.717,5.063A4,4,0,0,0,8,9a1,1,0,0,0,2,0,2,2,0,0,1,2.371-1.967,2.024,2.024,0,0,1,1.6,1.595,2,2,0,0,1-1,2.125A3.954,3.954,0,0,0,11,14.257V15a1,1,0,0,0,2,0v-.743a1.982,1.982,0,0,1,.93-1.752,4,4,0,0,0-1.213-7.442Z"/><rect x="11" y="17" width="2" height="2" rx="1"/>
                  </svg>
                  <p style={{fontSize: '.7rem'}}>Faqs</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewAgent;