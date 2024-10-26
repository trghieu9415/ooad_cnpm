import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Toast = ({ message, status, duration = 3000 }) => {
  useEffect(() => {
    switch (status) {
      case 'success':
        toast.success(message, { autoClose: duration })
        break
      case 'error':
        toast.error(message, { autoClose: duration })
        break
      case 'info':
        toast.info(message, { autoClose: duration })
        break
      case 'warn':
        toast.warn(message, { autoClose: duration })
        break
      default:
        toast(message, { autoClose: duration })
        break
    }
  }, [message, status, duration])

  return (
    <div>
      <ToastContainer />
    </div>
  )
}

export default Toast
