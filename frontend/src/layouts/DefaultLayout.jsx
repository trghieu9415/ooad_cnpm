import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className='flex'>
        <Sidebar>{children}</Sidebar>
      </div>
    </div>
  )
}

export default DefaultLayout
