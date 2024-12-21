import React from 'react'
import styles from '@/_components/styles/milestone.module.css'
import DisplayDate from '../_subComponent/DisplayDate'
const Milestones = () => {
  return (
    <div className={styles.mainGraphContainer}>
        <div className={styles.introTextContainer}>
            <p className={styles.chartHeader}>Performance</p>
            <DisplayDate />
            
        </div>
        <div className={styles.graphContainer}>
          {/* Metrics Graph container */}
        </div>
    </div>
  )
}

export default Milestones