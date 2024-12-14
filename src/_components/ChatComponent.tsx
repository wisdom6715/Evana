'use client'
import React, { useState, useRef, useEffect } from 'react'
import styles from '@/_components/styles/chatStyle.module.css'
import Image from 'next/image'
import ChatbotIMage from '@/app/assets/images/chatbot.jpeg'
import useCustomerServiceAI from '@/services/useCustomerServiceAI'

const ChatComponent = () => {
    const { 
        status, 
        qaStatus, 
        messages, 
        emailPromptVisible, 
        currentQuery,
        handleFileUpload, 
        handleQuerySubmit, 
        handleEmailSubmit, 
        setEmail,
        setCurrentQuery
    } = useCustomerServiceAI()
    
    const [userQuery, setUserQuery] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleQueryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserQuery(e.target.value);
    };

    const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailInput(e.target.value);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userQuery.trim()) {
            handleQuerySubmit(userQuery);
            setUserQuery(''); // Clear input after submitting
        }
    };

    const handleEmailSubmission = (e: React.FormEvent) => {
        e.preventDefault();
        if (emailInput.trim()) {
            handleEmailSubmit(emailInput);
            setEmailInput('');
        }
    };

    // Scroll to bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className={styles.generalContainer}>
            <div className={styles.botContainer}>
                <div className={styles.chatbotImageContainer}>
                    <Image className={styles.chatbotImage} alt="Chatbot icon" src={ChatbotIMage} />
                </div>
                <div className={styles.iconsContainer}>
                    <div className={styles.icon}>
                        <input 
                            ref={fileInputRef}
                            type="file" 
                            id="fileInput" 
                            accept=".csv,.pdf,.txt"
                            style={{ display: 'none' }}
                            onChange={handleFileChange} 
                        />
                        <div 
                            className={styles.icon} 
                            onClick={() => fileInputRef.current?.click()}
                        >
                            📁
                        </div>
                    </div>
                </div>
            </div>

            <div className='mb-3'>
                <p className="text-center">Your personal assistant, ready to help with frequently asked questions.</p>
            </div>

            <div className={styles.messagesContainer}>
                {messages.map((message, index) => (
                    <div 
                        key={index} 
                        className={`
                            ${styles.messageItem} 
                            ${message.type === 'user' ? styles.userMessage : styles.aiMessage}
                        `}
                    >
                        {message.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Email Prompt */}
            {emailPromptVisible && (
                <div className={styles.emailPrompt}>
                    <p>Our AI needs more context to answer your question. Please provide your email for our Customer to get back to you:</p>
                    <form onSubmit={handleEmailSubmission} className={styles.queryFormContainer}>
                        <input 
                            className='h-9 bg-white border border-gray-300 w-[80%]'
                            type="email" 
                            value={emailInput}
                            onChange={handleEmailInputChange}
                            placeholder="Enter your email"
                            required
                        />
                        <svg type="submit" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20" fill='grey'>
                            <path d="M5.521,19.9h5.322l3.519,3.515a2.035,2.035,0,0,0,1.443.6,2.1,2.1,0,0,0,.523-.067,2.026,2.026,0,0,0,1.454-1.414L23.989,1.425Z"/><path d="M4.087,18.5,22.572.012,1.478,6.233a2.048,2.048,0,0,0-.886,3.42l3.495,3.492Z"/>
                        </svg>
                    </form>
                </div>
            )}

           
            
            <div className={styles.mainInputContainer}>
                <form className={styles.inputContainer} onSubmit={handleFormSubmit}>
                    <input 
                        type="text" 
                        value={userQuery} 
                        onChange={handleQueryInputChange} 
                        placeholder="Enter a message" 
                        className={styles.input} 
                    />
                    <div className={styles.sendButtonContainer}>
                        <svg className={styles.sendButton} type="submit" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20" fill='grey'>
                            <path d="M5.521,19.9h5.322l3.519,3.515a2.035,2.035,0,0,0,1.443.6,2.1,2.1,0,0,0,.523-.067,2.026,2.026,0,0,0,1.454-1.414L23.989,1.425Z"/><path d="M4.087,18.5,22.572.012,1.478,6.233a2.048,2.048,0,0,0-.886,3.42l3.495,3.492Z"/>
                        </svg>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChatComponent;


// <div className={styles.chatContainer}>
// {/* Status Messages */}
// {/* {status && <div className={`${styles.message} ${styles.botMessage}`}>{status}</div>} */}
// {qaStatus && <div className={`${styles.message} ${styles.userMessage}`}>{qaStatus}</div>}
// </div>