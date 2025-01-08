import React, { useState, ChangeEvent, FormEvent } from 'react'
import style from '../form/styles/profile.module.css'

type CompanyTypes = {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    required: boolean;
}

interface FormData {
    companyName: string;
    companyEmail: string;
    companyContact: string;
    companyIndustry: string;
}

const Profile = () => {
    const [formData, setFormData] = useState<FormData>({
        companyName: '',
        companyEmail: '',
        companyContact: '',
        companyIndustry: 'e-commerce' // Default value
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const companyFields: CompanyTypes[] = [
        {
            label: 'Company Name',
            type: 'text',
            name: 'companyName',
            placeholder: 'Company Name',
            required: true
        },
        {
            label: 'Company Email Address',
            type: 'email', // Changed to email for better validation
            name: 'companyEmail',
            placeholder: 'Company Email',
            required: true
        },
        {
            label: 'Company Contact',
            type: 'tel',
            name: 'companyContact',
            placeholder: 'Company Contact',
            required: true
        }
    ];

    const industries = [
        { value: 'e-commerce', label: 'E-commerce' },
        { value: 'logistics', label: 'Logistics' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'edtech', label: 'Edtech' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'real-estate', label: 'Real Estate' },
        { value: 'fintech', label: 'Fintech' },
        { value: 'other', label: 'Other' }
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Add your API call here
            console.log('Form submitted:', formData);
            // await submitFormData(formData);
            
            // Add success handling here
        } catch (error) {
            console.error('Error submitting form:', error);
            // Add error handling here
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={style.formContainer}>
            {companyFields.map((field) => (
                <div key={field.name} className={style.inputContainer}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input 
                        id={field.name}
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof FormData]}
                        onChange={handleInputChange}
                        className={style.inputTag}
                        required={field.required}
                    />
                </div>
            ))}
            
            <div className={style.inputContainer}>
                <label htmlFor="companyIndustry">Company Industry</label>
                <select
                    id="companyIndustry"
                    name="companyIndustry"
                    value={formData.companyIndustry}
                    onChange={handleInputChange}
                    className={style.inputTag}
                    required
                >
                    {industries.map((industry) => (
                        <option key={industry.value} value={industry.value}>
                            {industry.label}
                        </option>
                    ))}
                </select>
            </div>
            
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
    );
};

export default Profile;