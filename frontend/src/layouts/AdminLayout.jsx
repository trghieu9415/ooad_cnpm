import Header from '../Components/Admin/Header/Header'
import Sidebar from '../Components/Admin/Sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../redux/slides/themeSlide'
import { useState } from 'react'
const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.theme.darkMode)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode())
  }
  return (
    <>
      <div className={`${darkMode ? 'dark' : ''}`}>
        <Header toggleDarkMode={handleToggleDarkMode} darkMode={darkMode} toggleSidebar={toggleSidebar} />
        <Sidebar isSidebarOpen={isSidebarOpen} />
        {children}
      </div>
    </>
  )
}

export default AdminLayout
