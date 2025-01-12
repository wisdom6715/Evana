import React from 'react'
import styles from '@/_components/styles/intro.module.css'
import DisplayDate from '../_subComponent/DisplayDate'
import Image from 'next/image'
import greetEmoji from '@/app/assets/images/greets.png'
const Intro = () => {
    
  return (
    <div className={styles.mainContainer}>
        <div className={styles.introContainer}>
            <div className={styles.innerContainer}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <h1 className={styles.headerText}>Hello BostonConsult!</h1>
                    <Image  alt='greet emoji' src={greetEmoji} height={30}/>
                </div>
                <DisplayDate />
            </div>
            <p className={styles.subHeaderText}>Track Zia progress and milestones</p>
        </div>

        <div className={styles.metricsIntroContainer}>
            <div className={styles.metricsContainer1}>
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width={30} height={30}>
                    <path d="m11,6h2v6.437l-4.887,2.989-1.043-1.707,3.93-2.403v-5.315ZM2,12C2,6.486,6.486,2,12,2c3.559,0,6.878,1.916,8.663,5.001.707,1.224,1.13,2.591,1.271,3.999h2c-.147-1.759-.657-3.473-1.541-5.001C20.253,2.299,16.271,0,12,0,5.383,0,0,5.383,0,12c0,3.076,1.162,6.002,3.273,8.236.449.475.937.896,1.444,1.286l1.423-1.423c-.501-.365-.977-.773-1.414-1.236-1.758-1.862-2.727-4.3-2.727-6.863Zm20,1h-4v2h2.568l-4.693,4.692-3.25-3.25-6.063,6.062,1.414,1.414,4.648-4.648,3.25,3.25,6.125-6.124v2.604h2v-4c0-1.103-.897-2-2-2Z"/>
                </svg>
                <div className={styles.metrics}>
                    <h2 className={styles.metricsText}>Interactions</h2>
                    <p>4,000</p>
                </div>
            </div>
            <div className={styles.metricsContainer2}>
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width={30} height={30}>
                    <path d="m13.914,19.45c.051.176.086.358.086.55,0,1.105-.895,2-2,2s-2-.895-2-2,.895-2,2-2c.164,0,.321.025.474.062l3.795-3.795c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414l-3.768,3.769Zm7.086-7.338v-6.035l1.293,1.293c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023,0-1.414l-2.427-2.428c-.706-.702-1.854-.704-2.561,0l-2.426,2.427c-.391.391-.391,1.023,0,1.414s1.023.391,1.414,0l1.293-1.293v4.196c-1.581-1.152-3.436-1.919-5.417-2.173-.194-.025-.388-.028-.583-.043V3.078l1.293,1.293c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023,0-1.414l-2.427-2.428c-.705-.702-1.854-.704-2.561,0l-2.426,2.427c-.391.391-.391,1.023,0,1.414s1.023.391,1.414,0l1.293-1.293v4.969c-2.162.184-4.236.947-6,2.213v-4.182l1.293,1.293c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023,0-1.414l-2.427-2.428c-.705-.702-1.854-.704-2.561,0L.293,5.957c-.391.391-.391,1.023,0,1.414s1.023.391,1.414,0l1.293-1.293v6.001c-1.916,2.179-3,4.988-3,7.921v.121c.023,2.139,1.818,3.879,4.002,3.879h2.998c.552,0,1-.447,1-1s-.448-1-1-1h-2.998c-1.093,0-1.99-.853-2.002-2,0-2.496.937-4.888,2.598-6.719,2.479-2.593,5.806-3.576,8.73-3.195,2.3.295,4.43,1.46,5.988,3.137.954,1.037,1.705,2.279,2.168,3.666.351,1.05.524,2.125.515,3.194-.009,1.057-.908,1.917-2.003,1.917h-2.996c-.552,0-1,.447-1,1s.448,1,1,1h2.996c2.188,0,3.984-1.749,4.003-3.899.011-1.292-.197-2.586-.619-3.847-.518-1.551-1.341-2.95-2.381-4.141Z"/>
                </svg>
                <div className={styles.metrics}>
                    <h2 className={styles.metricsText}>Progress</h2>
                    <p>40%</p>
                </div>
            </div>
            <div className={styles.metricsContainer3}>
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="30" height="30">
                <path d="M24,23c0,.552-.448,1-1,1H3c-1.654,0-3-1.346-3-3V1C0,.448,.448,0,1,0s1,.448,1,1V21c0,.551,.449,1,1,1H23c.552,0,1,.448,1,1Zm-3-18h-4c-.552,0-1,.448-1,1s.448,1,1,1h3.563l-4.857,4.707c-.377,.378-1.036,.378-1.413,0-.041-.04-1.239-.893-1.239-.893-1.138-1.073-3.077-1.033-4.162,.051l-4.586,4.414c-.398,.383-.41,1.016-.027,1.414,.197,.204,.458,.307,.721,.307,.25,0,.5-.093,.693-.279l4.6-4.428c.377-.378,1.036-.378,1.413,0,.041,.04,1.239,.893,1.239,.893,1.139,1.074,3.076,1.036,4.164-.054l4.89-4.74v3.607c0,.552,.448,1,1,1s1-.448,1-1v-4c0-1.654-1.346-3-3-3Z"/>
                </svg>
                <div className={styles.metrics}>
                    <h2 className={styles.metricsText}>Efficiency</h2>
                    <p>80%</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Intro