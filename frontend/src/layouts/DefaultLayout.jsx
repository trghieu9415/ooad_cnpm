import { useState } from 'react'
import { FaBookmark, FaHome, FaQuestionCircle, FaTags, FaUser } from 'react-icons/fa'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

const DefaultLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const menuItems = [
    { name: 'Home', icon: <FaHome />, redirectTo: '/' },
    { name: 'Questions', icon: <FaQuestionCircle />, redirectTo: '/questions' },
    { name: 'Tags', icon: <FaTags />, redirectTo: '/tags' },
    { name: 'Saves', icon: <FaBookmark />, redirectTo: '/users/saves' },
    { name: 'Users', icon: <FaUser />, redirectTo: '/users/all' }
  ]

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen)
  }

  return (
    <div>
      <div className='fixed top-0 left-0 right-0 z-50'>
        <Navbar />
      </div>

      <div className='flex'>
        <div className='pt-16'>
          <Sidebar menuItems={menuItems} onToggle={handleSidebarToggle} />
        </div>

        <div
          className={`flex-1 py-4 px-5 pt-20 transition-all duration-300`}
          style={{ marginLeft: isSidebarOpen ? '15rem' : '2.5rem' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
