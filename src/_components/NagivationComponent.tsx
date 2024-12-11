import React from 'react'
import styles from '@/_components/styles/navigationStyle.module.css'
const NagivationComponent = () => {
  return (
    <>
        <div className={styles.topContainer}>
            <div>
                <h1>KustomAI</h1>
            </div>

            <div className={styles.navIconSubContainers}>
                <div className={styles.navIcons}>
                    <div className={styles.iconContainer}>
                        <p>icon</p>
                        <p>Home</p>
                    </div>
                    <div className={styles.iconContainer}>
                        <p>icon</p>
                        <p>Train</p>
                    </div>
                    <div className={styles.iconContainer}>
                        <p>icon</p>
                        <p>Queries</p>
                    </div>
                    <div className={styles.iconContainer}>
                        <p>Icon</p>
                        <p>Settings</p>
                    </div>
                </div>

                <div className={styles.upgradeCAll}>
                    <p>upgrade to have access to advance cutomer service employee</p>
                    <button className={styles.upgradeButton}>Upgrade</button>
                </div>
            </div>
        </div>

        {/* call to action to upgrade to standard version */}
        <div className={styles.navIcons}>
            <div className={styles.iconContainer}>
                <p>icon</p>
                <p>help</p>
            </div>
            <div className={styles.iconContainer}>
                <p>icon</p>
                <p>Login</p>
            </div>
        </div>
        
    </>
  )
}

export default NagivationComponent