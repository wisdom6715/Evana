import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import style from '../form/styles/profile.module.css';
import useCompanyRegistration from '@/api/registerCompany';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';

type CompanyTypes = {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    required: boolean;
}

interface FormData {
    name: string;
    ai_name: string;
    phone: string;
    domain_name: string;
}

const Profile = () => {
    const { registerCompany } = useCompanyRegistration();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        ai_name: '',
        phone: '',
        domain_name: 'e-commerce'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch existing company data
    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;
                
                if (user) {
                    const db = getFirestore();
                    const companyDoc = doc(db, 'companies', user.uid);
                    const companySnap = await getDoc(companyDoc);

                    if (companySnap.exists()) {
                        const data = companySnap.data();
                        setFormData({
                            name: data.name || '',
                            ai_name: data.ai_name || '',
                            phone: data.phone || '',
                            domain_name: data.domain_name || 'e-commerce'
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching company data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyData();
    }, []);

    const companyFields: CompanyTypes[] = [
        {
            label: 'Company Name',
            type: 'text',
            name: 'name',
            placeholder: 'Company Name',
            required: true
        },
        {
            label: 'Company Email Address',
            type: 'email',
            name: 'ai_name',
            placeholder: 'Company Email',
            required: true
        },
        {
            label: 'Company Contact',
            type: 'tel',
            name: 'phone',
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
            await registerCompany(formData);
            // Navigate to customize component after successful submission
            router.push('/settings/customize');
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className={style.loading}>Loading company data...</div>;
    }

    return (
        <>
            <h1 style={{padding: '.5rem 2rem'}}>Enter Your Company's information</h1>
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
                    <label htmlFor="domain_name">Company Industry</label>
                    <select
                        id="domain_name"
                        name="domain_name"
                        value={formData.domain_name}
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
        </>
    );
};

export default Profile;