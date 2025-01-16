import React, { useState, FormEvent, useEffect, useRef } from 'react';
import styles from '@/_components/styles/chatStyle.module.css';
import Image from 'next/image';
import customizeIcon from '@/app/assets/images/customize.png';
import { useFileUpload } from '@/api/useUpload';
import useQAForm from '@/api/useChat';

interface FileUploadConfig {
    companyId: string;
    apiBaseUrl: string;
    onSuccess: () => void;
    onError: () => void;
}

interface MockFormEvent extends FormEvent<HTMLFormElement> {
    currentTarget: HTMLFormElement & {
        files?: FileList | null;
    };
}

interface Message {
    type: 'answer' | 'query';
    content: string;
}

const ChatComponent: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [popupMessage, setPopupMessage] = useState<string | null>(null);
    const [inputFocuse, setInputFocuse] = useState(false);
    const chatAreaRef = useRef<HTMLDivElement>(null);
    const companyId = 'cfcfbfd2-d4db-4335-a89f-eaecbf762be2';

    const showPopup = (message: string): void => {
        setPopupMessage(message);
        setTimeout(() => setPopupMessage(null), 3000);
    };

    const [{ isLoading }, { handleSubmit, handleFileUpload, fileInputRef }] = useFileUpload({
        companyId,
        apiBaseUrl: 'http://localhost:5000/api',
        onSuccess: () => {
            showPopup('File Successfully Uploaded!');
            console.log('uploaded');
        },
        onError: () => {
            showPopup('File Failed to Upload');
        },
    } as FileUploadConfig);

    const [query, setQuery] = useState<string>('');
    const WS_URL = 'ws://localhost:8765';
  
    const {
        handleChatting,
        answer,
    } = useQAForm({
        wsUrl: WS_URL
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files?.[0]) {
            const mockEvent: MockFormEvent = {
                ...new Event('submit') as any,
                preventDefault: () => {},
                currentTarget: Object.assign(document.createElement('form'), {
                    files: e.target.files
                }),
                bubbles: true,
                cancelable: true,
                defaultPrevented: false,
                isTrusted: true,
                timeStamp: Date.now(),
                type: 'submit',
                target: e.target
            } as MockFormEvent;
            handleSubmit(mockEvent);
        }
    };

    useEffect(() => {
        if (answer) {
            setMessages(prev => [...prev, 
                { type: 'answer', content: answer },
                { type: 'query', content: query }
            ]);
        }
    }, [answer, query]);

    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (query.trim()) {
            handleChatting(query, companyId);
            setQuery('');
        }
    };
    
    useEffect(() => {
        setInputFocuse(query !== '');
    }, [query]);

    return (
        <>
            <div className={styles.generalContainer}>
                {popupMessage && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '3%',
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                            padding: '.5rem 2rem',
                            backgroundColor: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            zIndex: 1000,
                        }}
                    >
                        <p style={{ color: 'black', margin: 0, fontSize: '1rem' }}>{popupMessage}</p>
                    </div>
                )}

                <div className={styles.botContainer}>
                    <div className={styles.botImage} onClick={() => showPopup('Hi')}></div>
                    <div className={styles.iconsContainer}>
                        <div className={styles.icon} onClick={handleFileUpload}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            {isLoading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20">
                                    <path d="M17.974,7.146c-.331-.066-.602-.273-.742-.569-1.55-3.271-5.143-5.1-8.734-4.438-3.272,.6-5.837,3.212-6.384,6.501-.162,.971-.15,1.943,.033,2.89,.06,.309-.073,.653-.346,.901-1.145,1.041-1.801,2.524-1.801,4.07,0,3.032,2.467,5.5,5.5,5.5h11c4.136,0,7.5-3.364,7.5-7.5,0-3.565-2.534-6.658-6.026-7.354Zm-1.474,12.854H5.5c-1.93,0-3.5-1.57-3.5-3.5,0-.983,.418-1.928,1.146-2.59,.786-.715,1.155-1.773,.963-2.763-.138-.712-.146-1.445-.024-2.181,.403-2.422,2.365-4.421,4.771-4.862,.385-.07,.768-.104,1.146-.104,2.312,0,4.405,1.289,5.422,3.434,.413,.872,1.2,1.482,2.158,1.673,2.56,.511,4.417,2.779,4.417,5.394,0,3.032-2.468,5.5-5.5,5.5Zm-1.379-7.707c.391,.391,.391,1.023,0,1.414-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293l-1.707-1.707v5c0,.553-.448,1-1,1s-1-.447-1-1v-5l-1.707,1.707c-.391,.391-1.023,.391-1.414,0s-.391-1.023,0-1.414l2.707-2.707c.386-.386,.893-.58,1.4-.583l.014-.003,.014,.003c.508,.003,1.014,.197,1.4,.583l2.707,2.707Z"/>
                                </svg>
                            )}
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

                <div className={styles.chatContainer}>
                    <div className={styles.chatArea} ref={chatAreaRef}>
                        <p className={styles.subText}>
                            Your virtual assistant, ready to help with frequently asked questions.
                        </p>
                        <div className="flex flex-col space-y-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${
                                        message.type === 'answer' ? 'justify-start' : 'justify-end'
                                    } my-4`}
                                >
                                    <div
                                        className={`max-w-[85%] p-4 rounded-lg break-words ${
                                            message.type === 'answer'
                                                ? 'bg-gray-200'
                                                : 'bg-blue-100'
                                        }`}
                                    >
                                        <p className="m-0">{message.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <form className={styles.inputContainer} onSubmit={onSubmit}>
                        <input 
                            type="text" 
                            placeholder="Enter a message" 
                            className={styles.input}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap:'.5rem', paddingRight: '.5rem'}}>
                            {!inputFocuse && (
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="24" height="24">
                                    <path d="M12,19.273c5.144,0,7.438-2.818,7.438-9.137S17.144,1,12,1,4.563,3.818,4.563,10.137s2.293,9.137,7.437,9.137Zm0-17.273c2.819,0,5.461,.701,6.22,5.207h-2.802c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h2.933c.057,.587,.087,1.229,.087,1.93s-.03,1.342-.087,1.93h-2.933c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h2.802c-.759,4.506-3.401,5.207-6.22,5.207s-5.46-.701-6.22-5.207h2.802c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5h-2.932c-.057-.587-.087-1.229-.087-1.93s.03-1.342,.087-1.93h2.932c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5h-2.802c.759-4.506,3.401-5.207,6.22-5.207Z"/>
                                    <path d="M22.414,11.783c-.273-.018-.516,.184-.538,.459-.631,8.065-5.719,9.758-9.876,9.758S2.755,20.307,2.124,12.242c-.021-.276-.264-.478-.538-.459-.275,.021-.481,.262-.459,.538,.728,9.292,7.125,10.68,10.874,10.68s10.146-1.388,10.874-10.68c.021-.275-.184-.516-.459-.538Z"/>
                                </svg>
                            )}
                            <button type='submit'> 
                                <svg xmlns="http://www.w3.org/2000/svg" id="arrow-circle-down" viewBox="0 0 24 24" width="24" height="24">
                                    <path d="M12,24A12,12,0,1,0,0,12,12.013,12.013,0,0,0,12,24ZM6.293,9.465,9.879,5.879h0a3,3,0,0,1,4.243,0l3.585,3.586.024.025a1,1,0,1,1-1.438,1.389L13,7.586,13.007,18a1,1,0,0,1-2,0L11,7.587,7.707,10.879A1,1,0,1,1,6.293,9.465Z"/>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChatComponent;