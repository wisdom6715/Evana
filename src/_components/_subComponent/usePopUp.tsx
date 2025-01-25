import React, { useState, useEffect } from 'react'

interface ToastProps {
  message: string | null
  type?: 'success' | 'error' | 'info'
  duration?: number
}

export const PopFunction: React.FC<ToastProps> = ({ 
  message, 
  type = 'info', 
  duration = 3000 
}) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!visible) return null

  const typeStyles = {
    success: 'bg-green-200 border-green-400',
    error: 'bg-red-200 border-red-400',
    info: 'bg-gray-300 border-gray-400'
  }

  return (
    <div className="fixed top-1 left-0 flex justify-center right-0 transform -translate-x-1/2 z-[9999] bg-red-400">
      <div className={`
        ${typeStyles[type]} 
        px-6 py-3 
        rounded-md 
        shadow-lg 
        text-center 
        max-w-md 
        w-full
        animate-bounce
      `}>
        {message}
      </div>
    </div>
  )
}