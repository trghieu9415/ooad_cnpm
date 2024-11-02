import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import InputComponent from '../../../Components/InputComponent'
import ButtonGroup from '../../../Components/ButtonGroup'
import UserInfo from '../../../Components/UserInfo'
import { memberAll } from '../../../apis/member.api'
import useDebounce from '../../../hooks/useDebounce'
import { Link } from 'react-router-dom'
import config from '../../../config/routePath'
const Users = () => {
  const [usersData, setUsersData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const debounceSearch = useDebounce(search, 300)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await memberAll()
        const transformedUsers = response.data.map((user) => ({
          id: user.id,
          name: user.name,
          location: user.location || 'N/A',
          reputation: user.reputation,
          questionCount: user.questionCount || 0,
          answerCount: user.answerCount || 0,
          joinedDate: new Date(user.joinedDate).toLocaleDateString() || 'N/A',
          tags: user.Badges.map((badge) => badge.name)
        }))
        setUsersData(transformedUsers)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

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

  const filteredUsers = useMemo(() => {
    return usersData.filter((user) => user.name.toLowerCase().includes(debounceSearch.toLowerCase()))
  }, [usersData, debounceSearch])

  if (loading) {
    return <div className='text-center'>Loading...</div>
  }

  return (
    <div className='container mx-auto px-5 py-5'>
      <h1 className='text-2xl font-semibold mb-4'>Users</h1>
      <div className='m-5'></div>
      <div className='flex flex-col gap-4 lg:flex-row lg:justify-between'>
        <div className='flex items-center lg:w-[350px] w-full p-1 border border-gray-900 rounded-lg'>
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
        {filteredUsers.map((user) => (
          <Link
            key={user.id}
            to={`${config.routes.users.replace(':slug', 'profile')}?id=${user.id}`}
            aria-label='View Detail'
          >
            <UserInfo user={user} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Users
