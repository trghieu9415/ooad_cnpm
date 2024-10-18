// import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <div className='flex'>
        <Sidebar />
        <div className='w-full ml-16 md:ml-56'>
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
