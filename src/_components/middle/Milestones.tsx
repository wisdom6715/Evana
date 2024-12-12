import React from 'react'
import styles from '@/_components/styles/middleStyle.module.css'
import metricsGraph from '@/app/assets/images/metricsGraph.jpeg'
import Image from 'next/image'
const Milestones = () => {
  return (
    <div className={styles.mainGraphContainer}>
        <div className={styles.introTextContainer}>
            <p>Performance</p>
            <p>dec 12, 2024</p>
        </div>
        <div className={styles.graphImageContainere}>
            {/* <Image 
            className={styles.graphImage}
            alt='metrics graph'
            src={metricsGraph}/> */}
        </div>
    </div>
  )
}

export default Milestones