import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import UserAvatar from '../Components/UserAvatar'
import Button from '../Components/Button'
// import { useSelector } from 'react-redux'

const UserLayout = ({ children, user = undefined, isOtherMember = false, idMember }) => {
  const [tabs] = useState([
    { name: 'Profile', path: idMember ? `/users/profile?id=${idMember}` : '/users/profile' },
    // { name: 'Questions', path: idMember ? `/users/questions?id=${idMember}` : '/users/questions' },
    { name: 'Saves', path: idMember ? `/users/saves?id=${idMember}` : '/users/saves' }
  ])

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col lg:flex-row justify-between'>
        <div className='flex items-center gap-8 mb-8'>
          <UserAvatar width={150} height={150} />
          <div>
            <h1 className='text-3xl'>{user.name}</h1>
            <p className='text-gray-600'>Member since January 2024</p>
          </div>
        </div>
        {isOtherMember && (
          <Link to='/users/edit-profile'>
            <Button
              className='w-50 h-10 bg-transparent p-2 border border-gray-500 text-gray-500'
              label='Edit Profile'
            />
          </Link>
        )}
      </div>

      <div className='my-8'>
        <ul className='flex gap-4'>
          {tabs.map((tab, index) => (
            <li key={index}>
              <NavLink
                to={tab.path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-gray-100 bg-orange-500 p-2 rounded-full'
                    : 'text-gray-600 hover:bg-gray-300 hover:rounded-full p-2'
                }
              >
                {tab.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex flex-col lg:flex-row mb-8'>
        <div className='lg:w-1/4 bg-white shadow-md rounded-lg p-4 mr-0 lg:mr-4 mb-4 lg:mb-0'>
          <h2 className='text-lg font-semibold'>Stats</h2>
          <div className='grid grid-cols-2 gap-4'>
            <div className='text-gray-700 text-sm flex flex-col items-center'>
              <span>{user.reputation}</span>
              <span>reputation</span>
            </div>
            <div className='text-gray-700 text-sm flex flex-col items-center'>
              <span>1</span>
              <span>reached</span>
            </div>
            <div className='text-gray-700 text-sm flex flex-col items-center'>
              <span>1</span>
              <span>answer</span>
            </div>
            <div className='text-gray-700 text-sm flex flex-col items-center'>
              <span>1</span>
              <span>question</span>
            </div>
          </div>
        </div>

        <div className='lg:w-3/4 bg-white shadow-md rounded-lg p-4'>{children}</div>
      </div>
    </div>
  )
}

export default UserLayout
