import React, { useState, ChangeEvent, FormEvent, useEffect, Dispatch, SetStateAction } from 'react';
import style from '../form/styles/profile.module.css';
import useCompanyRegistration from '@/api/registerCompany';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { auth } from '@/lib/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';
import useCompany from '@/services/fetchComapnyData';

type CompanyTypes = {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    required: boolean;
}

type ComponentType = 'Company Profile' | 'Customize chatbot' | 'Help Desks' | 'Integration' | 'Subscription Details' | 'Privacy';

interface ProfileProps {
    setActiveComponent: Dispatch<SetStateAction<ComponentType>>;
  }

interface FormData {
    name: string;
    ai_name: string;
    phone: string;
    domain_name: string;
}
const Profile:React.FC<ProfileProps> = ({setActiveComponent}) => {
    const [user, setUser] = useState(auth.currentUser);
    const [authLoading, setAuthLoading] = useState(true);
    console.log(user?.uid);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setAuthLoading(false); // Set loading to false once we have the auth state
        });
        return () => unsubscribe();
    }, []);
    const { registerCompany, company_id } = useCompanyRegistration();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        ai_name: '',
        phone: '',
        domain_name: 'e-commerce'
    });

    const { company } = useCompany({
        userId: user?.uid,
        /// company is to come below for checkings
        // companyId: 'c9969d36-908e-429d-b387-f963714baf24'
    });
    useEffect(() => {
        if (company) {
            setFormData({
                name: company.name || '',
                ai_name: company.ai_name || '',
                phone: company.phone || '',
                domain_name: company.domain_name || 'e-commerce'
            });
        }
        console.log(user?.uid);
        
    }, [company]);

    const [isSubmitting, setIsSubmitting] = useState(false);
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
        { value: 'other', label: 'Other' },
        { value: 'xyz', label: 'xyz' }
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
            const currentUser = auth.currentUser;
            
            if (!currentUser) {
                throw new Error('No user logged in');
            }
    
            // First register the company
            await registerCompany(formData);
            
            // Wait briefly for company_id to be set
            await new Promise(resolve => setTimeout(resolve, 100));
    
            // Now save to Firebase with the company_id
            const collectionRef = collection(db, "companies");
            const docRef = await addDoc(collectionRef, {
                ...formData,
                company_id,
                uid: currentUser.uid
            });
            
            console.log('Document written with ID:', docRef.id);
            console.log('Saved company_id:', company_id);
    
            // Navigate to next step
            setActiveComponent('Customize chatbot');
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

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