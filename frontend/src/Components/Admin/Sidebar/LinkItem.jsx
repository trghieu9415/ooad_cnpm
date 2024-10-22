import { Link } from 'react-router-dom'
import { FaUsersCog } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import { RiQuestionAnswerFill } from 'react-icons/ri'
import { FaPenToSquare } from 'react-icons/fa6'
import { MdSpatialTracking } from 'react-icons/md'

const LinkItem = () => {
  let arrayItem = [
    {
      to: '',
      icon: MdDashboard,
      name: 'Dashboard'
    },
    {
      to: '',
      icon: FaUsersCog,
      name: 'Quản lý người dùng'
    },
    {
      to: '',
      icon: RiQuestionAnswerFill,
      name: 'Quản lý câu hỏi và câu trả lời'
    },
    {
      to: '',
      icon: FaPenToSquare,
      name: 'Quản lý nội dung'
    },
    {
      to: '',
      icon: MdSpatialTracking,
      name: 'Theo dõi hoạt động'
    }
  ]

  const renderLinkItem = () => {
    return arrayItem.map((item, index) => (
      <li key={index}>
        <Link
          to={item.to}
          className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
        >
          <item.icon className='mr-3' />
          <span className='flex-1 me-3'>{item.name}</span>
        </Link>
      </li>
    ))
  }

  return <ul className='space-y-2 font-medium'>{renderLinkItem()}</ul>
}

export default LinkItem
