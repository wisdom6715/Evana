import React from 'react'
import styles from '@/_components/styles/chatStyle.module.css'

const chatComponent = () => {
  return (
    <>
        <div className={styles.generalContainer}>
            <div className={styles.botContainer}>
                <div className={styles.botImage}></div>
                <div className={styles.iconsContainer}>
                    <div className={styles.icon}></div>
                    <div className={styles.icon}></div>
                    <div className={styles.icon}></div>
                </div>
            </div>

            <div className={styles.chatContainer}>
                <p className='text-center'>Your personal assistant, ready to help with frequently asked questions.</p>
                <div className={styles.inputContainer}>
                    <input type="text"  placeholder='Enter a message' className={styles.input}/>
                    <div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default chatComponent