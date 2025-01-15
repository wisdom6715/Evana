import React from 'react'
import styles from '@/_components/styles/notification.module.css'

const update = () => {
  return (
    <div className={styles.mainContainer}>
        <h1 className={styles.headerText}>Notification</h1>
        <div className={styles.contentContainer}>
            <div className={styles.updateItemsContainer}>
                <div className={styles.notificationElement}>
                    <div className={styles.imageIcon}></div>
                    <p>I need detail description f your API usage from wisdomgmail.com</p>
                </div>
                <div className={styles.notificationElement}>
                    <div className={styles.imageIcon}></div>
                    <p>I need detail description f your API usage from wisdomgmail.com</p>
                </div>
                <div className={styles.notificationElement}>
                    <div className={styles.imageIcon}></div>
                    <p>I need detail description f your API usage from wisdomgmail.com</p>
                </div>
                <div className={styles.notificationElement}>
                    <div className={styles.imageIcon}></div>
                    <p>I need detail description f your API usage from wisdomgmail.com</p>
                </div>
                <div className={styles.notificationElement}>
                    <div className={styles.imageIcon}></div>
                    <p>I need detail description f your API usage from wisdomgmail.com</p>
                </div>
                <div className={styles.notificationElement}>
                    <div className={styles.imageIcon}></div>
                    <p>I need detail description f your API usage from wisdomgmail.com</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default update