import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Toast = ({ message, status }) => {
  useEffect(() => {
    switch (status) {
      case 'success':
        toast.success(message)
        break
      case 'error':
        toast.error(message)
        break
      case 'info':
        toast.info(message)
        break
      case 'warn':
        toast.warn(message)
        break
      default:
        toast(message)
        break
    }
  }, [message, status])

  return (
    <div>
      <ToastContainer />
    </div>
  )
}

export default Toast
