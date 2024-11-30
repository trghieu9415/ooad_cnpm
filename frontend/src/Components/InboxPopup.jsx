/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react'

const InboxPopup = ({ isOpen, onClose, className }) => {
  const popupRef = useRef(null)

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className={`absolute z-10 bg-white border border-gray-300 rounded-lg p-4 shadow-lg transition-all duration-200 ease-in-out ${className}`} // Áp dụng className
      ref={popupRef}
    >
      <h2 className='text-lg font-bold'>Inbox</h2>
      <div className='mt-2'>
        <p>This is your inbox pop-up!</p>
      </div>
      <button className='mt-4 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700'>View Messages</button>
    </div>
  )
}

export default InboxPopup
