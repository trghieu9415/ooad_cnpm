import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getRules } from '../../utils/rules'

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({})

  const rules = getRules(getValues)
  const onSubmit = handleSubmit((data) => {})
  console.log(errors)

  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
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
        <div className='max-w-7xl bg-white rounded-lg p-7 mb-3'>
          <div className='flex justify-center mb-2'>
            <svg aria-hidden='true' className='native svg-icon iconGlyphMd' width='32' height='37' viewBox='0 0 32 37'>
              <path fill='#BCBBBB' d='M26 33v-9h4v13H0V24h4v9z'></path>
              <path
                fill='#F48024'
                d='m21.5 0-2.7 2 9.9 13.3 2.7-2zM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6zM9.1 15.2l15 7 1.4-3-15-7zm14 10.79.68-2.95-16.1-3.35L7 23zM23 30H7v-3h16z'
              ></path>
            </svg>
          </div>
          <form className='rounded' onSubmit={onSubmit} noValidate>
            <div className='text-2xl'>
              <div className='mt-6'>
                <label className='block text-gray-700 font-semibold mb-1 text-sm' htmlFor='display-name'>
                  Username
                </label>
                <input
                  className='border border-gray-300 rounded-lg p-2 w-full text-sm'
                  type='text'
                  placeholder='Your username'
                  {...register('username', rules.username)}
                />
                <div className='mt-1 min-h-[1.25rem] text-sm text-red-500'>{errors.username?.message}</div>
              </div>
              <div className=''>
                <label className='block text-gray-700 font-semibold mb-1 text-sm' htmlFor='email'>
                  Email
                </label>
                <input
                  className='border border-gray-300 rounded-lg p-2 w-full text-sm'
                  type='email'
                  placeholder='you@example.com'
                  {...register('email', rules.email)}
                />
                <div className='mt-1 min-h-[1.25rem] text-sm text-red-500'>{errors.email?.message}</div>
              </div>
              <div>
                <label className='block text-gray-700 font-semibold mb-1 text-sm' htmlFor='phone'>
                  Phone
                </label>
                <input
                  className='border border-gray-300 rounded-lg p-2 w-full text-sm'
                  type='phone'
                  id='phone'
                  placeholder='Your phone number'
                  {...register('phone', rules.phone)}
                />
                <div className='mt-1 min-h-[1.25rem] text-sm text-red-500'>{errors.phone?.message}</div>
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
                  {...register('password', rules.password)}
                />
                <div className='mt-1 min-h-[1.25rem] text-sm text-red-500'>{errors.password?.message}</div>
              </div>
              <div>
                <label className='block text-gray-700 font-semibold mb-1 text-sm' htmlFor='password'>
                  Confirm password
                </label>
                <input
                  className='border border-gray-300 rounded-lg p-2 w-full text-sm'
                  type='password'
                  id='confirm_password'
                  placeholder='Confirm a password'
                  {...register('confirm_password', rules.confirm_password)}
                />
                <div className='mt-1 min-h-[1.25rem] text-sm text-red-500'>{errors.confirm_password?.message}</div>
              </div>
              <button
                className='w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300 text-sm'
                type='submit'
              >
                Sign up
              </button>
            </div>
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
            <Link className='text-blue-500 hover:underline' to='/login'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
