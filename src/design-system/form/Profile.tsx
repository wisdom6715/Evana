import React from 'react'
import style from '../form/styles/profile.module.css'

const profile = () => {
  return (
    <>
        <form action="" className={style.formContainer}>
            <div className={style.inputContainer}>
                <p>Company's Name</p>
                <input type="text" className={style.inputTag} />
            </div>

            <div className={style.inputContainer}>
                <p>Company's Email</p>
                <input type="text" className={style.inputTag}/>
            </div>

            <div className={style.inputContainer}>
                <p>Website url</p>
                <input type="text" className={style.inputTag}/>
            </div>

            <div className={style.inputContainer}>
                <p>password</p>
                <input type="text" className={style.inputTag}/>
            </div>
            <div >
                <button className={style.submitButton}>Save and Continue</button>
            </div>
        </form>
    </>
  )
}

export default profile