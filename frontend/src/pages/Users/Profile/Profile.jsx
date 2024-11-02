import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { memberById } from '../../../apis/member.api'
import { useLocation } from 'react-router-dom'

const Profile = ({ user }) => {
  return (
    <div className='min-h-screen flex justify-center items-start bg-gray-50 p-4'>
      <div className='max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 sm:p-8'>
        <div className='mt-4'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>Profile</h2>
          <div className='mb-4 pl-4'>
            <p className='text-gray-600'>
              <strong>Phone:</strong> {user?.phone || ''}
            </p>
            <p className='text-gray-600'>
              <strong>Email:</strong> {user?.email || ''}
            </p>
            <p className='text-gray-600'>
              <strong>Bio:</strong> {user?.biography || ''}
            </p>
          </div>
        </div>

        <div className='mt-4'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>Badges</h2>
          <div className='flex flex-wrap space-x-4'>
            {user.Badges && user.Badges.length > 0 ? (
              user.Badges.map((badge) => (
                <div key={badge.id} className='bg-gray-100 p-4 rounded-lg'>
                  <h3 className='font-semibold text-gray-700'>{badge.name}</h3>
                  <p className='text-gray-500'>{badge.description}</p>
                </div>
              ))
            ) : (
              <p className='text-gray-500'>No badges earned yet.</p>
            )}
          </div>
        </div>

        <div className='mt-4'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>Posts</h2>
          <ul className='space-y-2'>
            <li className='p-4 border border-gray-200 rounded-lg'>
              <p className='text-gray-800'>Understanding React Hooks</p>
              <span className='text-gray-500 text-sm'>Published: 1 week ago</span>
            </li>
            <li className='p-4 border border-gray-200 rounded-lg'>
              <p className='text-gray-800'>Tailwind CSS vs. Bootstrap</p>
              <span className='text-gray-500 text-sm'>Published: 2 weeks ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile
