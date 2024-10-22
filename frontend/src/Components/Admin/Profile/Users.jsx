import { RiAdminFill } from 'react-icons/ri'
const Users = () => {
  return (
    <div className='flex gap-3 items-center bg-white p-4 rounded-full dark:bg-gray-600 dark:text-gray-300'>
      <RiAdminFill className='w-14 h-14 rounded-full' />
      <h3 className='font-semibold text-2xl'>Admin phong</h3>
    </div>
  )
}

export default Users
