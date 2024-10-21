import { Link, useNavigate } from 'react-router-dom'
import { getRulesLogin } from '../../utils/rules'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { loginAccount } from '../../apis/auth.api'
import { isAxiosUnauthorizedError } from '../../utils/util'
import { useEffect, useRef, useState } from 'react'
import Toast from '../../Components/Toast'

const Login = () => {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const navigate = useNavigate()
  const timeoutRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({})
  const rules = getRulesLogin()

  const registerAccountMutation = useMutation({
    mutationFn: (body) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = data
    setMessage('')

    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        if (data.status === 200) {
          const token = data.headers.authorization.split(' ')[1]
          if (token) {
            localStorage.setItem('UserToken', token)
          }
          setMessage('Đăng nhập thành công !')
          setStatus('success')
          timeoutRef.current = setTimeout(() => navigate('/'), 3000)
        } else {
          setStatus('warning')
          setMessage('Tài khoản đã bị khoá.')
        }
      },
      onError: (error) => {
        if (isAxiosUnauthorizedError(error)) {
          const formError = error.response?.data
          if (formError?.username) {
            setError('username', {
              message: formError.username,
              type: 'error'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'error'
            })
          }
        }
      }
    })
  })

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-xs rounded-lg bg-white p-6 shadow-lg'>
        <div className='mb-2 flex justify-center'>
          <svg aria-hidden='true' className='native svg-icon iconGlyphMd' width='32' height='37' viewBox='0 0 32 37'>
            <path fill='#BCBBBB' d='M26 33v-9h4v13H0V24h4v9z'></path>
            <path
              fill='#F48024'
              d='m21.5 0-2.7 2 9.9 13.3 2.7-2zM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6zM9.1 15.2l15 7 1.4-3-15-7zm14 10.79.68-2.95-16.1-3.35L7 23zM23 30H7v-3h16z'
            ></path>
          </svg>
        </div>
        <h1 className='mb-6 text-center text-2xl font-bold'>Xin chào</h1>
        <form className='rounded' onSubmit={onSubmit} noValidate>
          <div>
            <input
              type='text'
              placeholder='Tên đăng nhập'
              className='w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
              {...register('username', rules.username)}
            />
            <div className='mt-1 min-h-[1.25rem] text-sm text-red-500'>{errors.username?.message}</div>
          </div>
          <div className='mt-2'>
            <input
              type='password'
              placeholder='Mật khẩu'
              className='w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
              {...register('password', rules.password)}
            />
            <div className='mt-1 min-h-[1.25rem] text-sm text-red-500'>{errors.password?.message}</div>
          </div>
          <button
            type='submit'
            className='mt-2 w-full rounded bg-blue-500 py-2 text-white transition hover:bg-blue-600'
          >
            Đăng nhập
          </button>
          <div className='mt-2 text-center'>
            <p className='text-sm'>
              Bạn chưa có tài khoản?
              <Link className='text-blue-500 hover:underline' to='/register'>
                {' '}
                Đăng ký
              </Link>
            </p>
          </div>
        </form>
      </div>
      {message && <Toast status={status} message={message} />}
    </div>
  )
}

export default Login
