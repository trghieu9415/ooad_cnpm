import Header from '../Components/Admin/Header/Header'
import Sidebar from '../Components/Admin/Sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../redux/slides/themeSlide'
const AdminLayout = ({ children }) => {
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.theme.darkMode)

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode())
  }
  return (
    <>
      <div className={`${darkMode ? 'dark' : ''}`}>
        <Header toggleDarkMode={handleToggleDarkMode} darkMode={darkMode} />
        <Sidebar />
        {children}
      </div>
    </>
  )
}

export default AdminLayout
