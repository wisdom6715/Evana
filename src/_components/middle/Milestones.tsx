import React from 'react'
import styles from '@/_components/styles/milestone.module.css'
import DisplayDate from '../_subComponent/DisplayDate'
import ResponsiveChart from '../_subComponent/Recharts'
const Milestones = () => {
  return (
    <div className={styles.mainGraphContainer}>
        <div className={styles.introTextContainer}>
            <p className={styles.chartHeader}>Performance</p>
            <DisplayDate />
            
        </div>
        <div className={styles.graphContainer}>
          {/* Metrics Graph container */}
          <ResponsiveChart />
        </div>
    </div>
  )
}

export default Milestones