import { useState } from 'react'
import Header from '../../../Components/Admin/Header/Header'
import Sidebar from '../../../Components/Admin/Sidebar/Sidebar'
import AdminLayout from '../../../layouts/AdminLayout'
import Profile from '../../../Components/Admin/Profile/Profile'
import Content from '../../../Components/Admin/components/Content'

export default function HomeAdmin() {
  const [darkMode, setDarkMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <div className={`${darkMode && 'dark'}`}>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <AdminLayout>
        <Content>main content</Content>
        <Profile />
      </AdminLayout>
    </div>
  )
}
