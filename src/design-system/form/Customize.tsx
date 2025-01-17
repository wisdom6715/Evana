import React, { useState, ChangeEvent, FormEvent } from 'react';
import style from '../form/styles/customize.module.css';
import PreviewAgent from './PreviewAgent';

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
    const [formData, setFormData] = useState<CustomizationTypes>({
        chatbotName: 'Maria',
        logo: null,
        welcomeMessage: '',
        theme: '#000000'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

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
            label: '👋 Welcome Message',
            type: 'text',
            name: 'welcomeMessage',
            placeholder: 'Enter welcome message',
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
        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value instanceof File || typeof value === 'string') {
                    formDataToSend.append(key, value);
                }
            });

            console.log('Form submitted:', formDataToSend);
            // await submitCustomization(formDataToSend);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
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
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save and Continue'}
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
