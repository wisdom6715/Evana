import React from 'react'
import style from '../form/styles/customize.module.css'

const profile = () => {
  return (
    <>
        <form action="" className={style.formContainer}>
            <div className={style.inputContainer}>
                <p>Chatbot Name</p>
                <input type="text" className={style.inputTag} required />
            </div>

            <div className={style.inputContainer}>
                <p>Choose icon</p>
                <input type="text" className={style.inputTag} required/>
            </div>

            <div className={style.inputContainer}>
                <p>Choose color</p>
                <input type="text" className={style.inputTag} required/>
            </div>

            <div className={style.inputContainer}>
                <p>Choose icon</p>
                <input type="text" className={style.inputTag} required/>
            </div>
            <div >
                <button className={style.submitButton}>Save and Continue</button>
            </div>
        </form>
    </>
  )
}

export default profile