import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import style from '../form/styles/customize.module.css';
import PreviewAgent from './PreviewAgent';
import { useCutomize } from '@/hook/useCustomize';
import useCompany from '@/services/fetchComapnyData';
import { auth } from '@/lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

type InputField = {
    label: string;
    type: string;
    name: keyof CustomizationTypes;
    placeholder: string;
    styles: {
        backgroundColor: string;
        width: string;
        border: string;
        height: string;
        padding: string;
    };
    required: boolean;
};

type CustomizationTypes = {
    chatbotName: string;
    logo: File | null;
    welcomeMessage: string;
    theme: string;
};

const Customize = () => {
    const [companyId, setCompanyId] = useState<string | null>(null);
    const [user, setUser] = useState(auth.currentUser);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        // Get companyId from localStorage only on client side
        setCompanyId(localStorage.getItem('companyId'));
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setAuthLoading(false);
        });
        return () => unsubscribe();
      }, []);

    const { company } = useCompany({
        userId: user?.uid,
        companyId: companyId!
      });
    const COMPANY_ID = company?.company_id!; // Replace with your actual company ID

    const {
        loading,
        error,
        success,
        currentConfig,
        updateConfig,
        loadCurrentConfig,
    } = useCutomize({ companyId: COMPANY_ID });

    const [formData, setFormData] = useState<CustomizationTypes>({
        chatbotName: 'Maria',
        logo: null,
        welcomeMessage: '',
        theme: '#000000'
    });
    useEffect(() => {
        if (currentConfig) {
            setFormData(prev => ({
                ...prev,
                chatbotName: currentConfig.name || prev.chatbotName,
                welcomeMessage: currentConfig.welcome_message || prev.welcomeMessage,
            }));
        }
    }, [currentConfig]);

    const inputFields: InputField[] = [
        {
            label: '🤖 Chatbot Name',
            type: 'text',
            name: 'chatbotName',
            placeholder: 'Enter chatbot name',
            styles: {
                backgroundColor: 'rgb(225, 225, 225)',
                width: '90%',
                border: '.1rem solid black',
                height: '40px',
                padding: '0 0 0 .5rem'
            },
            required: true
        },
        {
            label: '🎯 Company Logo',
            type: 'file',
            name: 'logo',
            placeholder: 'Upload logo',
            styles: {
                backgroundColor: 'rgb(225, 225, 225)',
                width: '40%',
                border: '.1rem dashed black',
                height: '40px',
                padding: '.2rem'
            },
            required: true
        },
        {
            label: '🎨 Theme',
            type: 'color',
            name: 'theme',
            placeholder: 'Select theme color',
            styles: {
                backgroundColor: 'rgb(225, 225, 225)',
                width: '20%',
                border: '.1rem solid black',
                height: '40px',
                padding: '.2rem'
            },
            required: true
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, files } = e.target;
        
        if (type === 'file' && files) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await updateConfig({
                chatbotName: formData.chatbotName,
                welcomeMessage: formData.theme,         // Intentionally using theme color as welcome message
                icon: formData.logo || undefined,
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const renderInput = (field: InputField) => {
        if (field.type === 'file') {
            return (
                <input
                    type="file"
                    style={field.styles}
                    name={field.name}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    accept="image/*"
                    required={field.required}
                />
            );
        }

        return (
            <input
                type={field.type}
                style={field.styles}
                name={field.name}
                value={formData[field.name] as string}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                required={field.required}
            />
        );
    };

    return (
        <div className={style.customizationContainer}>
            <form className={style.formContainer} onSubmit={handleSubmit}>
                {error && (
                    <div className={style.error}>
                        {error}
                    </div>
                )}
                {success && (
                    <div className={style.success}>
                        {success}
                    </div>
                )}
                
                {inputFields.map((field) => (
                    <div key={field.name} className={style.inputContainer}>
                        <label htmlFor={field.name}>{field.label}</label>
                        {renderInput(field)}
                    </div>
                ))}
                <div>
                    <button 
                        type="submit" 
                        className={style.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save and Continue'}
                    </button>
                </div>
            </form>
            <div className={style.customizationPreview}>
                <PreviewAgent 
                    logo={formData.logo} 
                    welcomeMessage={formData.welcomeMessage} 
                    chatbotName={formData.chatbotName} 
                    theme={formData.theme} 
                />
            </div>
        </div>
    );
};

export default Customize;