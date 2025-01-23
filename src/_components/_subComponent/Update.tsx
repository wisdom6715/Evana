import React, { useState, useRef } from 'react'
import { useFileUpload } from '@/hook/useCustomize'
import { PopFunction } from './usePopUp'
const Update = () => {
  const [message, setMessage] = useState('')
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { uploadFile, responseMessage, isLoading } = useFileUpload()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setMediaFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setMediaPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileUploadDiv = () => {
    fileInputRef.current?.click()
  }

  const handlePost = async () => {
    if (!message || !mediaFile) {
      alert('Please enter a message and upload media')
      return
    }

    const formData = new FormData()
    formData.append('text_field', message)
    formData.append('image', mediaFile)

    await uploadFile(formData)
    
    setMessage('')
    setMediaFile(null)
    setMediaPreview(null)
  }

  return (
    <>
      {responseMessage &&(
        <PopFunction 
          message={responseMessage} 
          type={responseMessage.includes('error') ? 'error' : 'success'}
        />
      )}
      <div className="flex flex-col h-full gap-5">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-l">Broadcast</h2>
          <button 
            onClick={handlePost}
            disabled={isLoading}
            className="bg-black text-white px-2 py-1 rounded opacity-100 disabled:opacity-50"
          >
            {isLoading ? 'Posting...' : 'Post'}
          </button>
        </div>

        <div style={{height: '80%'}} className="w-full flex flex-col items-center border-dashed border justify-center">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden" 
              accept="image/*"
            />
            <div 
              onClick={handleFileUploadDiv}
              className="w-[100%] border border-dashed h-[50%] border-gray-400 flex items-center justify-center cursor-pointer"
            >
              {mediaPreview ? (
                <img 
                  src={mediaPreview} 
                  alt="Uploaded preview" 
                  className="w-[100%] h-[100%] object-contain"
                />
              ) : (
                <p className="text-gray-500">Upload Media</p>
              )}
            </div>
        </div>

        <div className="h-[20%] w-full">
          <textarea 
            placeholder='Enter message to broadcast.......'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-[80%] bg-[#d0d4d2] px-2 py-1 resize-none border"
          />
        </div> 
    </div>
    </>
  )
}

export default Update