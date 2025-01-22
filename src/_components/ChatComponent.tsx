import React, { useState, FormEvent, useEffect, useRef } from 'react';
import styles from '@/_components/styles/chatStyle.module.css';
import Image from 'next/image';
import customizeIcon from '@/app/assets/images/customize.png';
import { useFileUpload } from '@/hook/useUpload';
import useQAForm from '@/hook/useChat';
import Update from './_subComponent/Update';
import ChatbotImage from '@/app/landingPage/_components/assets/images/AI.webp';
import useCompany from '@/services/fetchComapnyData';
import { auth } from '@/lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

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
    timestamp: Date;
}

const ChatComponent: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [popupMessage, setPopupMessage] = useState<string | null>(null);
    const [switchToUpdate, setSwitchToUpdate] = useState(true);
    const chatAreaRef = useRef<HTMLDivElement>(null);
    const [user, setUser] = useState(auth.currentUser);
    const [email, setEmail] = useState('');
    const [query, setQuery] = useState<string>('');
    
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
      return () => unsubscribe();
    }, []);
    const company_Id = localStorage.getItem('companyId');
    const { company } = useCompany({
      userId: user?.uid,
      companyId: company_Id!
    });
    const companyId: string | undefined = company?.company_id;
    const showPopup = (message: string): void => {
        setPopupMessage(message);
        setTimeout(() => setPopupMessage(null), 3000);
    };

    const [{ isLoading }, { handleSubmit: handleFileSubmit, handleFileUpload, fileInputRef }] = useFileUpload({
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
            handleFileSubmit(mockEvent);
        }
    };
    const WS_URL = 'ws://localhost:8765';
  
    const { 
        handleChatting, 
        handleEmailSubmission, 
        answer, 
        connectionStatus, 
        isLoading: chatLoading, 
        error: chatError,
        showEmailForm
    } = useQAForm({ wsUrl: WS_URL });

    useEffect(() => {
        if (answer) {
            setMessages(prev => [
                ...prev,
                { 
                    type: 'answer', 
                    content: answer,
                    timestamp: new Date()
                }
            ]);
        }
    }, [answer]);

    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
        if (message.type === 'answer') {
            return (
                <div className="flex items-start gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <Image 
                            src={ChatbotImage} 
                            alt="AI" 
                            width={32} 
                            height={32} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col max-w-[70%]">
                        <div className="bg-gray-200 p-3 rounded-lg rounded-tl-none">
                            <p className="m-0 text-sm">{message.content}</p>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                </div>
            );
        }
        
        return (
            <div className="flex items-start gap-2 mb-4 flex-row-reverse">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-sm">You</span>
                </div>
                <div className="flex flex-col items-end max-w-[70%]">
                    <div className="bg-blue-500 p-3 rounded-lg rounded-tr-none">
                        <p className="m-0 text-sm text-white">{message.content}</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </div>
        );
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!showEmailForm && query.trim()) {
            setMessages(prev => [
                ...prev,
                {
                    type: 'query',
                    content: query.trim(),
                    timestamp: new Date()
                }
            ]);
            await handleChatting(query, companyId!);
            setQuery('');
        } else if (showEmailForm && email.trim()) {
            await handleEmailSubmission(email);
            setEmail('');
        }
    };

    const EmailForm = () => (
        <form onSubmit={handleSubmit} className="border-t bg-white p-4">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Please provide your email for a detailed response
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
                Submit
            </button>
        </form>
    );

    const ChatForm = () => (
        <form 
            className="border-t bg-white grid grid-cols-[80%_20%] items-center gap-1"
            onSubmit={handleSubmit}
        >
            <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 w-[100%] pl-2 rounded-full focus:outline-none focus:border-blue-500"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                }}
            />
            <button 
                type="submit"
                style={{width: '60%', height: '60%', backgroundColor: '#0c0e0e'}}
                className="flex items-center justify-center rounded-full text-white transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
            </button>
        </form>
    );

    return (
        <div className={styles.generalContainer}>
            {popupMessage && (
                <div className="absolute top-[3%] left-1/2 transform -translate-x-1/2 p-2 px-8 bg-white border rounded-md shadow-md z-50">
                    <p className="text-black m-0 text-base">{popupMessage}</p>
                </div>
            )}
            
            <div className={styles.botContainer}>
                <Image className={styles.botImage} src={ChatbotImage} alt='AI Image'/>
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
                    <div className={styles.icon} onClick={() => setSwitchToUpdate(prevstate => !prevstate)}>
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

            <>
            {switchToUpdate ? (
                <div className={styles.chatContainer}>
                    <div className={styles.chatArea} ref={chatAreaRef}>
                        <p className={styles.subText}>
                            Your virtual assistant, ready to help with frequently asked questions.
                        </p>
                        <div className="flex flex-col p-4">
                            {messages.map((message, index) => (
                                <MessageBubble key={index} message={message} />
                            ))}
                            <div>{showEmailForm ?  
                                <form 
                                    className="border-t bg-white flex flex-col items-center gap-1"
                                    onSubmit={handleSubmit}
                                >   
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Please provide your email for a detailed response
                                </label>
                                <div className='flex flex-row'>
                                    <input 
                                        type="email" 
                                        placeholder="Type a message..." 
                                        className="flex-1 w-[100%] pl-2 rounded-full focus:outline-none focus:border-blue-500 bg-gray-300"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                    />
                                    <div>
                                        <button 
                                            type="submit"
                                            style={{width: '100%', height: '100%', backgroundColor: '#0c0e0e'}}
                                            className="flex items-center justify-center rounded-full text-white transition-colors"
                                        >
                                            send
                                        </button>
                                    </div>
                                </div>
                            </form> : ''} </div>
                        </div>
                    </div>
                    <form 
                        className="border-t bg-white grid grid-cols-[80%_20%] items-center gap-1"
                        onSubmit={handleSubmit}
                    >
                        <input 
                            type="text" 
                            placeholder="Type a message..." 
                            className="flex-1 w-[100%] pl-2 rounded-full focus:outline-none focus:border-blue-500"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value)
                            }}
                        />
                        <button 
                            type="submit"
                            style={{width: '60%', height: '60%', backgroundColor: '#0c0e0e'}}
                            className="flex items-center justify-center rounded-full text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </form>
                </div>
            ) : <Update />}
            </>
        </div>
    );
};

export default ChatComponent;