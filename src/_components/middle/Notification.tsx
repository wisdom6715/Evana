import React from 'react'
import styles from '@/_components/styles/notification.module.css'

const update = () => {
    const notifications = [
        {
            title: 'Notifications',
            contents: 'I need detail description f your API usage from wisdomgmail.com',
            namePrefix: 'IB'
        }
    ]
  return (
    <div className={styles.mainContainer}>
        <h1 className={styles.headerText}>Notification</h1>
        <div className={styles.contentContainer}>
            <div className={styles.updateItemsContainer}>
                {notifications.map((item, index) => {
                    return(
                        <div key={index} className={styles.notificationElement}>
                            <div className={styles.imageIcon}>{item.namePrefix}</div>
                            <p>{item.contents}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default update