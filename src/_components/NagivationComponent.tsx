'use client'
import styles from '@/_components/styles/navigationStyle.module.css'
import Image from 'next/image'
import customizeIcon from '@/app/assets/images/customize.png'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import fetchUserData from '@/services/fetchUserData';
import Logo from '@/app/assets/images/Screenshot 2025-01-11 090739.png'
const NagivationComponent = () => {
    const [activeNav, setActiveNav] = useState<string>('')
    const router = useRouter()
    const pathname = usePathname();
    const {userData} = fetchUserData()

    useEffect(() => {
        const path = pathname?.split('/')[2]; // Get the second segment of the path
        setActiveNav(path || '');
    }, [pathname]); // 

    const handlePageNavigation = (navigate: string) => {
        router.push(`/dashboard/${navigate}`);
    };

  return (
    <>
        <div className={styles.topContainer}>
            <div className={styles.logoContainer}>
                <Image className='w-64 h-10' src={Logo} alt='Intuitionlabs Logo'/>
            </div>

            <div className={styles.navIconSubContainers}>
                <div className={styles.navIcons}>
                    <div className={styles.iconContainer} onClick={()=> handlePageNavigation('home')} style={{backgroundColor: activeNav == 'home'? '#EAEAEA' : 'white', padding: '.5rem .5rem'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20">
                                <path d="M19,24H5c-2.757,0-5-2.243-5-5V9.724c0-1.665,.824-3.215,2.204-4.145L9.203,.855c1.699-1.146,3.895-1.146,5.594,0l7,4.724c1.379,.93,2.203,2.479,2.203,4.145v9.276c0,2.757-2.243,5-5,5ZM12,1.997c-.584,0-1.168,.172-1.678,.517L3.322,7.237c-.828,.558-1.322,1.487-1.322,2.486v9.276c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V9.724c0-.999-.494-1.929-1.321-2.486L13.678,2.514c-.51-.345-1.094-.517-1.678-.517Z"/>
                        </svg>
                        <p>Home</p>
                    </div>

                    <div className={styles.iconContainer} onClick={()=> handlePageNavigation('chatlogs')} style={{backgroundColor: activeNav == 'chatlogs'? '#EAEAEA' : 'white', padding: '.5rem .5rem'}}>
                        <Image alt='customize icon' src={customizeIcon} height={20}/>
                        <p>Chatlogs</p>
                    </div>

                    <div className={styles.iconContainer} onClick={()=> handlePageNavigation('desk')} style={{backgroundColor: activeNav == 'desk'? '#EAEAEA' : 'white', padding: '.5rem .5rem'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20">
                            <path d="m19,4h-1.101c-.465-2.279-2.485-4-4.899-4H5C2.243,0,0,2.243,0,5v12.854c0,.794.435,1.52,1.134,1.894.318.171.667.255,1.015.255.416,0,.831-.121,1.19-.36l2.95-1.967c.691,1.935,2.541,3.324,4.711,3.324h5.697l3.964,2.643c.36.24.774.361,1.19.361.348,0,.696-.085,1.015-.256.7-.374,1.134-1.1,1.134-1.894v-12.854c0-2.757-2.243-5-5-5ZM2.23,17.979c-.019.012-.075.048-.152.007-.079-.042-.079-.109-.079-.131V5c0-1.654,1.346-3,3-3h8c1.654,0,3,1.346,3,3v7c0,1.654-1.346,3-3,3h-6c-.327,0-.541.159-.565.175l-4.205,2.804Zm19.77,3.876c0,.021,0,.089-.079.131-.079.041-.133.005-.151-.007l-4.215-2.811c-.164-.109-.357-.168-.555-.168h-6c-1.304,0-2.415-.836-2.828-2h4.828c2.757,0,5-2.243,5-5v-6h1c1.654,0,3,1.346,3,3v12.854Z"/>
                        </svg>
                        <p>Desk</p>
                    </div>

                    <div className={styles.iconContainer} onClick={()=> handlePageNavigation('leads')} style={{backgroundColor: activeNav == 'leads'? '#EAEAEA' : 'white', padding: '.5rem .5rem'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20">
                            <path d="m24,7v12.231c0,.742-.273,1.455-.772,2.01l-2.489,2.759h-2.693l3.697-4.098c.166-.185.258-.423.258-.671V7c0-.551-.449-1-1-1s-1,.449-1,1v8h-.005c0,.684-.232,1.369-.696,1.922l-2.578,2.684-1.441-1.386,2.533-2.634c.448-.471.087-1.084-.066-1.255-.366-.409-.998-.443-1.406-.077l-2.908,2.676c.366.507.568,1.122.568,1.756v5.314h-2v-5.314c0-.279-.118-.547-.323-.735l-4.026-3.705c-.398-.356-1.03-.324-1.397.086-.328.367-.337.928-.021,1.305l2.57,2.671-1.441,1.386-2.616-2.721c-.488-.579-.73-1.279-.735-1.972h-.011V7c0-.551-.449-1-1-1s-1,.449-1,1v12.231c0,.248.092.486.258.671l3.697,4.098h-2.693l-2.489-2.759c-.499-.555-.772-1.268-.772-2.01V7c0-1.654,1.346-3,3-3,1.053,0,1.98.546,2.516,1.369.263-.229.607-.369.984-.369h1.5c0,.618.147,1.198.401,1.717-.766.58-1.278,1.462-1.369,2.471v.815c-.346-.002-.692.031-1.032.1v2.068c.999-.35,2.153-.161,2.996.594l3.004,2.764,2.995-2.756c.849-.761,2.007-.951,3.005-.602v-2.065c-.34-.068-.687-.101-1.034-.098v-.842c-.096-1-.606-1.874-1.367-2.45.253-.519.401-1.099.401-1.717h1.5c.377,0,.721.139.984.369.535-.823,1.463-1.369,2.516-1.369,1.654,0,3,1.346,3,3Zm-10.5,1h-3c-.828,0-1.5.672-1.5,1.5v.919c.474.207.924.492,1.33.855l1.67,1.536,1.64-1.51c.416-.372.876-.663,1.36-.874v-.928c0-.828-.672-1.5-1.5-1.5Zm-5.5-4c1.105,0,2-.895,2-2s-.895-2-2-2-2,.895-2,2,.895,2,2,2Zm4,3c1.105,0,2-.895,2-2s-.895-2-2-2-2,.895-2,2,.895,2,2,2Zm4-3c1.105,0,2-.895,2-2s-.895-2-2-2-2,.895-2,2,.895,2,2,2Z"/>
                        </svg>
                        <p>Leads</p>
                    </div>

                    <div className={styles.iconContainer} onClick={()=> handlePageNavigation('settings')} style={{backgroundColor: activeNav == 'settings'? '#EAEAEA' : 'white', padding: '.5rem .5rem'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20">
                            <path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/><path d="M21.294,13.9l-.444-.256a9.1,9.1,0,0,0,0-3.29l.444-.256a3,3,0,1,0-3-5.2l-.445.257A8.977,8.977,0,0,0,15,3.513V3A3,3,0,0,0,9,3v.513A8.977,8.977,0,0,0,6.152,5.159L5.705,4.9a3,3,0,0,0-3,5.2l.444.256a9.1,9.1,0,0,0,0,3.29l-.444.256a3,3,0,1,0,3,5.2l.445-.257A8.977,8.977,0,0,0,9,20.487V21a3,3,0,0,0,6,0v-.513a8.977,8.977,0,0,0,2.848-1.646l.447.258a3,3,0,0,0,3-5.2Zm-2.548-3.776a7.048,7.048,0,0,1,0,3.75,1,1,0,0,0,.464,1.133l1.084.626a1,1,0,0,1-1,1.733l-1.086-.628a1,1,0,0,0-1.215.165,6.984,6.984,0,0,1-3.243,1.875,1,1,0,0,0-.751.969V21a1,1,0,0,1-2,0V19.748a1,1,0,0,0-.751-.969A6.984,6.984,0,0,1,7.006,16.9a1,1,0,0,0-1.215-.165l-1.084.627a1,1,0,1,1-1-1.732l1.084-.626a1,1,0,0,0,.464-1.133,7.048,7.048,0,0,1,0-3.75A1,1,0,0,0,4.79,8.992L3.706,8.366a1,1,0,0,1,1-1.733l1.086.628A1,1,0,0,0,7.006,7.1a6.984,6.984,0,0,1,3.243-1.875A1,1,0,0,0,11,4.252V3a1,1,0,0,1,2,0V4.252a1,1,0,0,0,.751.969A6.984,6.984,0,0,1,16.994,7.1a1,1,0,0,0,1.215.165l1.084-.627a1,1,0,1,1,1,1.732l-1.084.626A1,1,0,0,0,18.746,10.125Z"/>
                        </svg>
                        <p>Settings</p>
                    </div>
                </div>

                {/* call to action to upgrade to standard version */}
                {userData?.subscription?.planType ===  'basic' ?
                    <div className={styles.upgradeCAll}>
                        <p>upgrade to advance cutomer service AI tool</p>
                        <button className={styles.upgradeButton}>Upgrade</button>
                    </div> : ''
                }
            </div>
        </div>

        <div className={styles.navIcons}>
            <div className={styles.iconContainer} onClick={()=> handlePageNavigation('help')} style={{backgroundColor: activeNav == 'help'? '#EAEAEA' : 'white', padding: '.5rem .5rem'}}>
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20">
                    <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"/><path d="M12,10H11a1,1,0,0,0,0,2h1v6a1,1,0,0,0,2,0V12A2,2,0,0,0,12,10Z"/><circle cx="12" cy="6.5" r="1.5"/>
                </svg>
                <p>Help</p>
            </div>
            <div className={styles.iconContainer} style={{padding: '.5rem .5rem'}}>
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20">
                    <title>11-arrow</title><path d="M22.763,10.232l-4.95-4.95L16.4,6.7,20.7,11H6.617v2H20.7l-4.3,4.3,1.414,1.414,4.95-4.95a2.5,2.5,0,0,0,0-3.536Z"/><path d="M10.476,21a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2H9.476a1,1,0,0,1,1,1V8.333h2V3a3,3,0,0,0-3-3H3A3,3,0,0,0,0,3V21a3,3,0,0,0,3,3H9.476a3,3,0,0,0,3-3V15.667h-2Z"/>
                </svg>
                <p>Logout</p>
            </div>
        </div>
        
    </>
  )
}

export default NagivationComponent