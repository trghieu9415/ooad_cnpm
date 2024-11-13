/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { NavLink, useNavigate, useResolvedPath } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

const Sidebar = ({ menuItems, onToggle }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [hiddenIcon, setHideIcon] = useState(true)

  const path = useResolvedPath()
  const navigate = useNavigate()

  const toggleSidebar = () => {
    if (window.innerWidth >= 640) {
      setIsOpen((prevState) => !prevState)
      onToggle(!isOpen)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsOpen(false)
        onToggle(false)
        setHideIcon(false)
      } else {
        setHideIcon(true)
        onToggle(isOpen)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [onToggle, isOpen])

  const slugsOfUser = ['all', 'profile', 'change-password', 'edit-profile']

  const handleActive = (currentPath) => {
    if (currentPath.startsWith('/users/')) {
      const slug = currentPath.split('/')[2]

      if (slug === 'saves') {
        return '/users/saves'
      } else if (slugsOfUser.includes(slug)) {
        return '/users/all'
      } else {
        return null
      }
    }
    return currentPath
  }

  useEffect(() => {
    const activePath = handleActive(path.pathname)
    if (activePath === null) {
      navigate('/not-found')
    }
  }, [path, navigate])

  return (
    <div
      className={`${
        isOpen ? 'w-60' : 'w-10'
      } bg-primaryColor h-screen fixed top-navbar left-0 transition-all duration-300 z-1`}
    >
      {hiddenIcon && (
        <div
          className='absolute top-4 right-[-15px] bg-gray-100 border border-gray-700 rounded-full p-1 cursor-pointer'
          onClick={toggleSidebar}
        >
          <FaBars className='text-black' />
        </div>
      )}
      <div className='flex items-center justify-center h-16 border-b border-gray-700'>
        {isOpen && <h1 className='text-white text-xl font-bold'>StackOverflow</h1>}
      </div>

      <ul className='mt-4'>
        {menuItems.map((item, index) => (
          <NavLink key={index} to={item.redirectTo}>
            <li
              className={`flex items-center p-2 my-2 rounded-lg cursor-pointer ${
                handleActive(path.pathname) === item.redirectTo ? 'bg-gray-800' : ''
              } hover:bg-gray-700`}
            >
              <div className='text-white text-lg'>{item.icon}</div>
              {isOpen && <span className='ml-4 text-white'>{item.name}</span>}
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
