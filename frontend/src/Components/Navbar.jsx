import { NavLink } from 'react-router-dom'
import UserAvatar from './UserAvatar'
import { FaInbox } from 'react-icons/fa'
import InputComponent from './InputComponent'
import { useState } from 'react'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const [search, setSearch] = useState('')

  const handleClearSearch = () => {
    setSearch('')
  }

  return (
    <header className='flex items-center justify-between px-4 py-2 border-b-2 border-gray-200'>
      <div className='flex items-center'>
        <NavLink to='/'>
          <img
            className='w-[120px] h-[36px] object-cover sm:w-[150px] sm:h-[42px]'
            src='./img/iconStackOverflow.png'
            alt='Stack Overflow Icon'
          />
        </NavLink>
      </div>

      <form action='' className='flex-1 px-4 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl'>
        <div className='flex justify-center items-center border-[1px] border-gray-400 rounded-lg group px-2 py-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 lg:mx-1'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z'
            />
          </svg>

          <InputComponent
            type='text'
            name='search'
            placeholder='Search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full'
            classNameInput='border-none outline-none w-full px-2 py-1'
            iconClear={true}
            onClear={handleClearSearch}
          />
        </div>
      </form>

      <div className='flex items-center space-x-4'>
        <FaInbox className='text-4xl cursor-pointer rounded-lg hover:bg-gray-300 p-2' />
        <UserAvatar classNameFrame='border border-gray-900 cursor-pointer' width={30} height={30} />
        <div className=''>
          {user === null ? (
            <NavLink to='/login'>
              <button className='rounded-md bg-blue-600 py-2 px-4 border border-transparent text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 active:bg-blue-700 ml-2'>
                Log in
              </button>
            </NavLink>
          ) : (
            <NavLink className='flex items-center' to='/profile'>
              <div className='hover:bg-slate-200 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full'>
                <img
                  className='w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-full'
                  src='https://i.pinimg.com/originals/64/8e/58/648e58d071568bba75276ea8f632a7ad.gif'
                  alt='User Avatar'
                />
              </div>
              <button
                onClick={() => setUser(null)}
                className='bg-transparent h-8 ml-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-4 border border-blue-500 hover:border-transparent rounded'
              >
                Logout
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
