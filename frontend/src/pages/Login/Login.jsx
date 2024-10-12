import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
      <div className='w-full max-w-xs bg-white p-6 rounded-lg shadow-lg'>
        <div className='flex justify-center mb-2'>
          <svg aria-hidden='true' className='native svg-icon iconGlyphMd' width='32' height='37' viewBox='0 0 32 37'>
            <path fill='#BCBBBB' d='M26 33v-9h4v13H0V24h4v9z'></path>
            <path
              fill='#F48024'
              d='m21.5 0-2.7 2 9.9 13.3 2.7-2zM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6zM9.1 15.2l15 7 1.4-3-15-7zm14 10.79.68-2.95-16.1-3.35L7 23zM23 30H7v-3h16z'
            ></path>
          </svg>
        </div>
        <h1 className='text-center text-2xl font-bold mb-6'>Login</h1>
        <form className='space-y-4'>
          <input
            type='text'
            placeholder='Tên đăng nhập'
            required
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
          <input
            type='password'
            placeholder='Mật khẩu'
            required
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
          <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition'>
            Đăng nhập
          </button>
          <div className='text-center'>
            <a href='#' className='text-sm text-blue-500 hover:underline'>
              Quên mật khẩu?
            </a>
          </div>
          <div className='text-center'>
            <p className='text-sm'>
              Bạn chưa có tài khoản?
              <Link className='text-blue-500 hover:underline' to='/register'>
                Đăng ký
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
