import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  let user = null
  return (
    <nav>
      <header className='flex items-center justify-around border-b-2 border-gray-200 pb-2'>
        <div className=''>
          <NavLink to='/'>
            <img className='mt-3 w-[150px] h-[42px] object-cover' src='./img/iconStackOverflow.png' alt='icon' />
          </NavLink>
        </div>
        <ol className='flex gap-4'>
          <li>
            <NavLink className='cursor-pointer text-gray-500 p-2 text-sm hover:bg-[#d1d5db] rounded-2xl' to='/product'>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink className='cursor-pointer  text-gray-500 p-2 text-sm hover:bg-[#d1d5db] rounded-2xl' to='/contact'>
              Contacts
            </NavLink>
          </li>
        </ol>
        <form action='' className='w-2/5'>
          <div className='flex border-[1px] border-gray-400 rounded-lg group'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6 mx-2 pt-1 group-focus:ring-2 focus:ring-blue-600'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>

            <input
              className='w-full p-1 outline-none group-focus:ring-2 focus:ring-blue-600'
              type='text'
              placeholder='Search...'
            />
          </div>
        </form>
        <div className='w-1/12'>
          {user === null ? (
            <NavLink className='' to='/auth'>
              <button className='rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2'>
                Log in
              </button>
            </NavLink>
          ) : (
            <NavLink className='flex justify-between' to=''>
              <div className='hover:bg-slate-200 w-14 h-14 flex items-center justify-center'>
                <img
                  className='w-10 h-10 object-cover'
                  src='https://i.pinimg.com/originals/64/8e/58/648e58d071568bba75276ea8f632a7ad.gif'
                  alt='hello'
                />
              </div>
              <div className='flex items-center'>
                <button className='bg-transparent h-8  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-4 border border-blue-500 hover:border-transparent rounded'>
                  Logout
                </button>
              </div>
            </NavLink>
          )}
        </div>
      </header>
    </nav>
  )
}

export default Navbar
