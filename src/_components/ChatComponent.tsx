import React, { useState } from 'react';
import styles from '@/_components/styles/chatStyle.module.css';
import Image from 'next/image';
import customizeIcon from '@/app/assets/images/customize.png';
import { useFileUpload } from '@/api/useUpload';

const ChatComponent = () => {
    const [popupMessage, setPopupMessage] = useState<string | null>(null);

    const [{ isLoading, error, isSuccess }, { handleSubmit, handleFileUpload, fileInputRef }] = useFileUpload({
        companyId: 'cfcfbfd2-d4db-4335-a89f-eaecbf762be2',
        apiBaseUrl: 'http://localhost:5000/api',
        onSuccess: () => {
            showPopup('File Successfully Uploaded!');
            console.log('uploaded');
        },
        onError: () => {
            showPopup('File Failed to Upload');
        },
    });

    const showPopup = (message: string) => {
        setPopupMessage(message);
        setTimeout(() => setPopupMessage(null), 3000); // Hide popup after 3 seconds
    };

    return (
        <>
            <div className={styles.generalContainer}>
                {/* Show Success Popup */}
                {popupMessage && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '3%',
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                            padding: '1rem 2rem',
                            backgroundColor: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            zIndex: 1000,
                        }}
                    >
                        <p style={{ color: 'greenyellow', margin: 0, fontSize: '1rem' }}>{popupMessage}</p>
                    </div>
                )}

                {/* Chatbot Custom Container */}
                <div className={styles.botContainer}>
                    <div className={styles.botImage} onClick={() => showPopup('Hi')}></div>
                    <div className={styles.iconsContainer}>
                        <div className={styles.icon} onClick={handleFileUpload}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        const formEvent = { preventDefault: () => {}, currentTarget: { files: e.target.files } };
                                        handleSubmit(formEvent as any);
                                    }
                                }}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20">
                                <path d="M17.974,7.146c-.331-.066-.602-.273-.742-.569-1.55-3.271-5.143-5.1-8.734-4.438-3.272,.6-5.837,3.212-6.384,6.501-.162,.971-.15,1.943,.033,2.89,.06,.309-.073,.653-.346,.901-1.145,1.041-1.801,2.524-1.801,4.07,0,3.032,2.467,5.5,5.5,5.5h11c4.136,0,7.5-3.364,7.5-7.5,0-3.565-2.534-6.658-6.026-7.354Zm-1.474,12.854H5.5c-1.93,0-3.5-1.57-3.5-3.5,0-.983,.418-1.928,1.146-2.59,.786-.715,1.155-1.773,.963-2.763-.138-.712-.146-1.445-.024-2.181,.403-2.422,2.365-4.421,4.771-4.862,.385-.07,.768-.104,1.146-.104,2.312,0,4.405,1.289,5.422,3.434,.413,.872,1.2,1.482,2.158,1.673,2.56,.511,4.417,2.779,4.417,5.394,0,3.032-2.468,5.5-5.5,5.5Zm-1.379-7.707c.391,.391,.391,1.023,0,1.414-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293l-1.707-1.707v5c0,.553-.448,1-1,1s-1-.447-1-1v-5l-1.707,1.707c-.391,.391-1.023,.391-1.414,0s-.391-1.023,0-1.414l2.707-2.707c.386-.386,.893-.58,1.4-.583l.014-.003,.014,.003c.508,.003,1.014,.197,1.4,.583l2.707,2.707Z"/>
                            </svg>
                        </div>
                        <div className={styles.icon}>
                            <Image alt="customize icon" src={customizeIcon} height={20} />
                        </div>
                        <div className={styles.icon}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
                                <g>
                                    <circle cx="256" cy="53.333" r="53.333" />
                                    <circle cx="256" cy="256" r="53.333" />
                                    <circle cx="256" cy="458.667" r="53.333" />
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Chat Container */}
                <div className={styles.chatContainer}>
                    <div className={styles.chatArea}>
                        <p className={styles.subText}>Your virtual assistant, ready to help with frequently asked questions.</p>
                    </div>
                    <div className={styles.inputContainer}>
                        <input type="text" placeholder="Enter a message" className={styles.input} />
                        <div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatComponent;