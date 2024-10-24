import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { IoLogoStackoverflow } from 'react-icons/io5'
import { IoLogOut } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import routes from '../../../config/routePath/routes'
import Profile from '../Profile/Profile'

const Header = ({ darkMode, toggleDarkMode, toggleSidebar }) => {
  return (
    <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
      <div className='px-3 py-3 lg:px-5 lg:pl-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start rtl:justify-end'>
            <button
              className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden
            hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 
            dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              onClick={toggleSidebar}
            >
              <HiOutlineMenuAlt2 className='text-2xl' />
            </button>
            <Link className='flex ms-2 md: me-24' to='/'>
              <IoLogoStackoverflow className='h-8 me-3 text-xl text-orange-400' />
              <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
                Stack Overflow Admin
              </span>
            </Link>
          </div>
          <div className='flex items-center space-x-4'>
            <Profile />
            <div className='flex items-center'>
              <button className='dark:bg-slate-50 dark:text-slate-700 rounded-full p-2 mr-2' onClick={toggleDarkMode}>
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
              <Link to={routes.adminLogin} className='dark:bg-slate-50 dark:text-slate-700 rounded-full p-2 text-lg'>
                <IoLogOut />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
