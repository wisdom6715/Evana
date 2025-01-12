'use client';
import React from 'react';
import styles from '@/landingPage/home/_components/styles/home.module.css';
import bgImage from '@/landingPage/home/_components/images/backgroundImage.webp'
import Header from './_components/Header';
import Intro from './_components/Intro';

const Page = () => {
    return (
        <div 
            className={styles.generalContainer}
            style={{
                backgroundImage: `url(${bgImage.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Header />
            <Intro />
        </div>
    );
};

export default Page;