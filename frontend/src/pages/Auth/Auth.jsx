import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'

const Login = () => {
  let [isLogin, setLogin] = useState(true)

  const handleChangeForm = () => {
    setLogin(!isLogin)
  }
  return (
    <div>
      {/* <Navbar /> */}
      <div className='bg-gray-100 flex items-center justify-center h-screen'>
        {!isLogin ? (
          <div className='flex justify-between'>
            {/* Left section: Community description */}
            <div className='w-1/2 flex items-center justify-center'>
              <div>
                <h1 className='text-lg font-bold mb-4'>Join the Stack Overflow community</h1>
                <ul className='list-disc pl-5 mb-5 space-y-2 text-gray-700 text-sm'>
                  <li>Get unstuck — ask a question</li>
                  <li>Unlock new privileges like voting and commenting</li>
                  <li>Save your favorite tags, filters, and jobs</li>
                  <li>Earn reputation and badges</li>
                  <li>Collaborate and share knowledge with a private group</li>
                </ul>
                <p className='text-xs text-gray-500'>
                  Collaborate and share knowledge with a private group for up to 50 users.
                </p>
              </div>
            </div>
            {/* Right section: Form */}
            <div className='max-w-xs bg-white rounded-lg p-7 mb-3'>
              <div className='flex justify-center mb-2'>
                <svg
                  aria-hidden='true'
                  className='native svg-icon iconGlyphMd'
                  width='32'
                  height='37'
                  viewBox='0 0 32 37'
                >
                  <path fill='#BCBBBB' d='M26 33v-9h4v13H0V24h4v9z'></path>
                  <path
                    fill='#F48024'
                    d='m21.5 0-2.7 2 9.9 13.3 2.7-2zM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6zM9.1 15.2l15 7 1.4-3-15-7zm14 10.79.68-2.95-16.1-3.35L7 23zM23 30H7v-3h16z'
                  ></path>
                </svg>
              </div>
              <form action='#' method='post' className='space-y-4'>
                <div>
                  <label className='block text-gray-700 font-semibold mb-1 text-sm' htmlFor='display-name'>
                    Display name
                  </label>
                  <input
                    className='border border-gray-300 rounded-lg p-2 w-full text-sm'
                    type='text'
                    id='display-name'
                    placeholder='Your display name'
                    required
                  />
                </div>
                <div>
                  <label className='block text-gray-700 font-semibold mb-1 text-sm' htmlFor='email'>
                    Email
                  </label>
                  <input
                    className='border border-gray-300 rounded-lg p-2 w-full text-sm'
                    type='email'
                    id='email'
                    placeholder='you@example.com'
                    required
                  />
                </div>
                <div>
                  <label className='block text-gray-700 font-semibold mb-1 text-sm' htmlFor='password'>
                    Password
                  </label>
                  <input
                    className='border border-gray-300 rounded-lg p-2 w-full text-sm'
                    type='password'
                    id='password'
                    placeholder='Create a password'
                    required
                  />
                  <small className='text-gray-500 text-xs'>
                    Passwords must contain at least eight characters, including at least 1 letter and 1 number.
                  </small>
                </div>
                <div>
                  <label className='inline-flex items-center'>
                    <input type='checkbox' className='form-checkbox text-blue-500' />
                    <span className='ml-2 text-gray-700 text-sm'>
                      Opt-in to receive occasional product updates, user research invitations, company announcements,
                      and digests.
                    </span>
                  </label>
                </div>
                <button
                  className='w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300 text-sm'
                  type='submit'
                >
                  Sign up
                </button>
              </form>
              <p className='mt-4 text-gray-700 text-xs text-center'>
                By clicking Sign up, you agree to our
                <a href='#' className='text-blue-500 hover:underline'>
                  terms of service
                </a>
                ,
                <a href='#' className='text-blue-500 hover:underline'>
                  privacy policy
                </a>
                , and
                <a href='#' className='text-blue-500 hover:underline'>
                  cookie policy
                </a>
                .
              </p>
              <p className='mt-3 text-center text-gray-700 text-xs'>
                Already have an account?{' '}
                <button className='text-blue-500 hover:underline' onClick={handleChangeForm}>
                  Sign in
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div className='w-full max-w-xs bg-white p-6 rounded-lg shadow-lg'>
            <div className='flex justify-center mb-2'>
              <svg
                aria-hidden='true'
                className='native svg-icon iconGlyphMd'
                width='32'
                height='37'
                viewBox='0 0 32 37'
              >
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
                type='email'
                placeholder='Email'
                required
                className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
              />
              <input
                type='password'
                placeholder='Password'
                required
                className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
              />
              <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition'>
                Log in
              </button>
              <div className='text-center'>
                <a href='#' className='text-sm text-blue-500 hover:underline'>
                  Forgot password?
                </a>
              </div>
              <div className='text-center'>
                <p className='text-sm'>
                  Dont have an account?
                  <button className='text-blue-500 hover:underline' onClick={handleChangeForm}>
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
