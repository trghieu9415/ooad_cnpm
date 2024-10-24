import { RiAdminFill } from 'react-icons/ri'

const Users = () => {
  return (
    <div className='flex gap-2 items-center bg-white p-2 rounded-full dark:bg-gray-600 dark:text-gray-300'>
      <RiAdminFill className='w-8 h-8 rounded-full' />
      <h3 className='font-medium text-base'>Admin phong</h3>
    </div>
  )
}

export default Users
