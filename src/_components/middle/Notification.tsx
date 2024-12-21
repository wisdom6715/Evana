import React from 'react'
import styles from '@/_components/styles/notification.module.css'

const update = () => {
  return (
    <div className={styles.mainContainer}>
        <div className={styles.contentContainer}>
            <h1 className={styles.headerText}>Notification</h1>
            <div className={styles.updateItemsContainer}>
                <div className={styles.notificationElement}>
                    <div className={styles.imageIcon}></div>
                    <p>I need detail description f your API usage from wisdomgmail.com</p>
                </div>
                <div className={styles.notificationElement}>
                    <div className={styles.imageIcon}></div>
                    <p>I need detail description f your API usage from wisdogmail.com</p>
                </div>
                <div className={styles.notificationElement}>
                    <div className={styles.imageIcon}></div>
                    <p>I need detail description f your API usage from wisdgmail.com</p>
                </div>
                <div className={styles.notificationElement}>
                    <div className={styles.imageIcon}></div>
                    <p>I need detail description f your API usage from wisgmail.com</p>
                </div>
                <div className={styles.notificationElement}>
                    <div className={styles.imageIcon}></div>
                    <p>I need detail description f your API usage from wigmail.com</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default update