'use client';
import React from 'react';
import styles from '@/app/landingPage/home/_components/styles/home.module.css';
import bgImage from '@/app/landingPage/home/_components/images/backgroundImage.webp'
import Header from '../_components/Header';
import Intro from './_components/Intro';
import HumanSupport from './_components/HumanSupport';
import Benefit from './_components/Benefit';
import MeetAI from './_components/MeetAI';
import BotCall from './_components/BotCall';
import LastSection from './_components/LastSection';
import Footer from '../_components/Footer';
const Page = () => {
    return (
        <div className={styles.generalContainer}
        style={{
            backgroundImage: `url(${bgImage.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div style={{width: '100%', height: '100vh'}}>
                <Header />
                <Intro />
            </div>
            <HumanSupport />
            <Benefit />
            <MeetAI />
            <BotCall />
            <LastSection />
            <Footer />
        </div>
    );
};

export default Page;