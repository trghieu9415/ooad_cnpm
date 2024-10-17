import { useState } from 'react'
import { FaHome, FaQuestionCircle, FaBars, FaBookmark, FaUser, FaTags } from 'react-icons/fa'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    { name: 'Home', icon: <FaHome /> },
    { name: 'Questions', icon: <FaQuestionCircle /> },
    { name: 'Tags', icon: <FaTags /> },
    { name: 'Saves', icon: <FaBookmark /> },
    { name: 'Users', icon: <FaUser /> }
  ]

  return (
    <div className='flex'>
      <div className={`${isOpen ? 'w-60' : 'w-10'} bg-primaryColor h-screen transition-width duration-300 relative`}>
        <div
          className='absolute top-4 right-[-15px] bg-gray-100 border border-gray-700 rounded-full p-1 cursor-pointer'
          onClick={toggleSidebar}
        >
          <FaBars className='text-black' />
        </div>

        <div className='flex items-center justify-center h-16 border-b border-gray-700'>
          {isOpen && <h1 className='text-white text-xl font-bold'>StackOverFlow</h1>}
        </div>

        <ul className='mt-4'>
          {menuItems.map((item, index) => (
            <li key={index} className='flex items-center p-2 hover:bg-gray-700 cursor-pointer'>
              <div className='text-white text-lg'>{item.icon}</div>
              {isOpen && <span className='text-white ml-4'>{item.name}</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className='flex-1 p-4'>
        <h1 className='text-2xl font-bold'>Content</h1>
        <p className='mt-4'>Hello World</p>
      </div>
    </div>
  )
}

export default Sidebar
