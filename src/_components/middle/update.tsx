import React from 'react'
import styles from '@/_components/styles/update.module.css'

const update = () => {
  return (
    <div className=' h-[100%] text-white'>
        <div className='flex flex-col h-[100%] gap-3'>
            <h1 className='text-black'>Notification</h1>
            <div className={styles.updateItemsContainer}>
                <div className='flex flex-row items-center gap-1 bg-gray-300'>
                    <div className={styles.imageIcon}></div>
                    <p>I need detail description f your API usage from wisdomgmail.com</p>
                </div>
                <div className='flex flex-row items-center gap-3 bg-gray-300'>
                    <div className={styles.imageIcon}></div>
                    <p>I need detail description f your API usage from wisdogmail.com</p>
                </div>
                <div className='flex flex-row items-center gap-3 bg-gray-300'>
                    <div className={styles.imageIcon}></div>
                    <p>I need detail description f your API usage from wisdgmail.com</p>
                </div>
                <div className='flex flex-row items-center gap-3 bg-gray-300'>
                    <div className={styles.imageIcon}></div>
                    <p>I need detail description f your API usage from wisgmail.com</p>
                </div>
                <div className='flex flex-row items-center gap-3 bg-gray-300'>
                    <div className={styles.imageIcon}></div>
                    <p>I need detail description f your API usage from wigmail.com</p>
                </div>
                <div className='flex flex-row items-center gap-3 bg-gray-300'>
                    <div className={styles.imageIcon}></div>
                    <p>I need detail description f your API usage from wgmail.com</p>
                </div>
                <div className='flex flex-row items-center gap-3 bg-gray-300'>
                    <div className={styles.imageIcon}></div>
                    <p>I need detail description f your API usage from gmail.com</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default update