import { useSelector } from 'react-redux'
import Profile from '../../../Components/Admin/Profile/Profile'
import Content from '../../../Components/Admin/components/Content'

export default function Member() {
  const darkMode = useSelector((state) => state.theme.darkMode)

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className='text-gray-500 bg-gray-100 p-4 sm:ml-64 flex gap-2 flex-col lg:flex-row translate-all duration-300 mt-14 dark:bg-gray-800'>
        <Content>Question</Content>
      </div>
    </div>
  )
}
