import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import InputComponent from '../../../Components/InputComponent'
import ButtonGroup from '../../../Components/ButtonGroup'
import UserInfo from '../../../Components/UserInfo'

const Users = () => {
  const usersData = [
    {
      id: 1,
      name: 'John Doe',
      location: 'New York',
      reputation: 150,
      questionCount: 10,
      answerCount: 5,
      joinedDate: '2024-01-10',
      tags: ['React', 'JavaScript']
    },
    {
      id: 2,
      name: 'Jane Smith',
      location: 'Los Angeles',
      reputation: 200,
      questionCount: 8,
      answerCount: 12,
      joinedDate: '2023-11-22',
      tags: ['HTML', 'CSS']
    },
    {
      id: 3,
      name: 'Alice Johnson',
      location: 'San Francisco',
      reputation: 300,
      questionCount: 15,
      answerCount: 20,
      joinedDate: '2024-03-15',
      tags: ['Node.js', 'Express']
    },
    {
      id: 4,
      name: 'Bob Brown',
      location: 'Chicago',
      reputation: 50,
      questionCount: 5,
      answerCount: 2,
      joinedDate: '2024-02-01',
      tags: ['Vue.js']
    }
  ]

  const [search, setSearch] = useState('')

  const handleClearSearch = () => {
    setSearch('')
  }

  const buttonItems = ['Reputation', 'New User', 'Voters', 'Editors', 'Moderators']
  const location = useLocation()

  const handleTabClick = (item) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('tab', item)
    const newPath = `${location.pathname}?${searchParams.toString()}`
    window.history.pushState({}, '', newPath)
  }

  return (
    <div className='container mx-auto px-5 py-5'>
      <h1 className='text-2xl font-semibold mb-4'>Users</h1>
      <div className='m-5'></div>
      <div className='flex justify-between flex-col gap-4 lg:flex-row'>
        <div className='lg:w-[350px] w-[200px] p-1 border border-gray-900 rounded-lg flex justify-center items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 lg:mx-3'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z'
            />
          </svg>
          <InputComponent
            type='text'
            name='search'
            placeholder='Filter by user'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full border border-gray-400 rounded-lg overflow-hidden'
            classNameInput='border-none outline-none w-full pl-1 pr-10 text-xl h-8'
            iconClear={true}
            onClear={handleClearSearch}
          />
        </div>
        <ButtonGroup listItem={buttonItems} onClick={handleTabClick} />
      </div>
      <div className='m-5'></div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {usersData.map((user) => (
          <UserInfo key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default Users
