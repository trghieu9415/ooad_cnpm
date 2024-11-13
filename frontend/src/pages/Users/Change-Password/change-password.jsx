import { useState } from 'react'
import { ChangePasswordUser } from '../../../apis/account.api'
import Toast from '../../../Components/Toast'

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const token = localStorage.getItem('UserToken')

  const passwordRegex = /^.{8,}$/

  const handleChangePassword = async () => {
    if (!passwordRegex.test(currentPassword) || !passwordRegex.test(newPassword)) {
      setMessage('Mật khẩu phải có ít nhất 8 ký tự.')
      setStatus('error')
      return
    }

    try {
      const body = { current_password: currentPassword, new_password: newPassword }
      const response = await ChangePasswordUser(body, token)
        console.log(response)
      if (response.status === 200) {
        setMessage('Đổi mật khẩu thành công!')
        setStatus('success')
      } else {
        setMessage('Đổi mật khẩu thất bại. Kiểm tra lại mật khẩu hiện tại!')
        setStatus('error')
      }
    } catch (error) {
      setMessage('Đổi mật khẩu thất bại. Kiểm tra lại mật khẩu hiện tại!')
      setStatus('error')
    }
  }

  return (
    <div className='container mx-auto p-4 max-w-md'>
      <h2 className='text-2xl font-semibold mb-4 text-center'>Change Password</h2>

      <label className='block text-gray-700 mb-2'>Current Password</label>
      <div className='relative mb-4'>
        <input
          type={showCurrentPassword ? 'text' : 'password'}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
          placeholder='Enter current password'
        />
        <button
          type='button'
          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          className='absolute right-2 top-2 text-gray-600'
        >
          {showCurrentPassword ? '🙈' : '👁️'}
        </button>
      </div>

      <label className='block text-gray-700 mb-2'>New Password</label>
      <div className='relative mb-4'>
        <input
          type={showNewPassword ? 'text' : 'password'}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
          placeholder='Enter new password'
        />
        <button
          type='button'
          onClick={() => setShowNewPassword(!showNewPassword)}
          className='absolute right-2 top-2 text-gray-600'
        >
          {showNewPassword ? '🙈' : '👁️'}
        </button>
      </div>

      <button onClick={handleChangePassword} className='w-full bg-blue-500 text-white p-2 rounded mt-4'>
        Change Password
      </button>

      {message && <Toast status={status} message={message} />}
    </div>
  )
}

export default ChangePassword
