import { Link } from 'react-router-dom'
import { FaUsersCog } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import { RiQuestionAnswerFill, RiQuestionnaireFill } from 'react-icons/ri'
import { FaTags,FaAward  } from 'react-icons/fa'
import routes from '../../../config/routePath/routes'
const LinkItem = () => {
  let arrayItem = [
    {
      to: routes.adminHome,
      icon: MdDashboard,
      name: 'Dashboard'
    },
    {
      to: routes.adminMember,
      icon: FaUsersCog,
      name: 'Quản lý người dùng'
    },
    {
      to: routes.adminQuestion,
      icon: RiQuestionnaireFill,
      name: 'Quản lý câu hỏi'
    },
    {
      to: routes.adminAnswer,
      icon: RiQuestionAnswerFill,
      name: 'Quản lý câu trả lời'
    },
    {
      to: routes.adminTag,
      icon: FaTags,
      name: 'Quản lí thẻ gắn'
    },
    {
      to: routes.adminBadge,
      icon: FaAward,
      name: 'Quản lí danh hiệu'
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
