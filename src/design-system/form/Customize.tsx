import React from 'react'
import style from '../form/styles/customize.module.css'
import PreviewAgent from './PreviewAgent'

const profile = () => {
  return (
    <>
        <div className={style.customizationContainer}>
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
                    <p>Upload Logo</p>
                    <input type="text" className={style.inputTag} required/>
                </div>
                <div >
                    <button className={style.submitButton}>Save and Continue</button>
                </div>
            </form>
            <div className={style.customizationPreview}>
                <PreviewAgent />
            </div>
        </div>
    </>
  )
}

export default profile