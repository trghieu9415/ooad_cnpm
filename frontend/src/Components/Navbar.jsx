import { allQuestion } from '../apis/question.api'
import { NavLink, useNavigate } from 'react-router-dom'
import UserAvatar from './UserAvatar'
import { FaInbox } from 'react-icons/fa'
import InputComponent from './InputComponent'
import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser } from '../redux/slides/userSlide'
import InboxPopup from './InboxPopup'
import useDebounce from '../hooks/useDebounce'
import logoStackOverFlow from '../assets/logo-stackOverFlow.png'
const Navbar = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [isInboxOpen, setIsInboxOpen] = useState(false)
  const [allQuestions, setAllQuestions] = useState([])
  const navigate = useNavigate()

  const handleClearSearch = () => {
    setSearch('')
  }

  const handleLogout = () => {
    dispatch(resetUser())
    localStorage.removeItem('UserToken')
    localStorage.removeItem('persist:root')
    window.location.href = '/'
  }

  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    allQuestion()
      .then((response) => {
        setAllQuestions(response.data)
      })
      .catch((error) => {
        console.error('Error fetching questions:', error)
      })
  }, [])

  const searchResults = useMemo(() => {
    if (!debouncedSearch) return []
    return allQuestions.filter((question) => question.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
  }, [debouncedSearch, allQuestions])

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      navigate(`/questions/all?search=${debouncedSearch}`)
    }
  }

  return (
    <header className='flex items-center justify-between px-4 py-2 border-b-2 border-gray-200 bg-white'>
      <div className='flex items-center'>
        <NavLink to='/'>
          <img
            className='w-[100px] h-[30px] lg:w-[150px] lg:h-[42px] object-cover'
            src={logoStackOverFlow}
            alt='Stack Overflow Icon'
          />
        </NavLink>
      </div>

      <form className='flex-1 px-2 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl'>
        <div className='flex justify-center items-center border border-gray-400 rounded-lg px-2 py-1 relative'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 lg:mx-1'
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
            placeholder='Search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className='w-full'
            classNameInput='border-none outline-none w-full px-2 pl-1 pr-10'
            iconClear={true}
            onClear={handleClearSearch}
          />
          {searchResults.length > 0 && (
            <div className='absolute top-full left-0 right-0 bg-white shadow-lg border border-gray-200 mt-1 z-10'>
              <ul>
                {searchResults.map((result) => (
                  <li key={result.id} className='p-2 hover:bg-gray-100'>
                    <NavLink to={`/questions/id?questionId=${result.id}`} onClick={() => setSearch('')}>
                      {result.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </form>

      <div className='flex items-center relative gap-4'>
        <FaInbox
          className='text-4xl cursor-pointer rounded-lg hover:bg-gray-300 p-2 hidden sm:block'
          onClick={() => setIsInboxOpen((prev) => !prev)}
        />
        <InboxPopup
          isOpen={isInboxOpen}
          onClose={() => setIsInboxOpen(false)}
          className='w-64 top-[40px] left-[-230px]'
        />
        {user.id ? (
          <div className='flex items-center'>
            <button
              className='flex items-center gap-2 border border-gray-400 rounded-lg'
              onClick={() => {
                window.location.href = '/users/profile'
              }}
            >
              <UserAvatar classNameFrame='w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-full cursor-pointer' />
              <span className='hidden sm:block ml-2'>{user.name}</span>
            </button>
            <button
              onClick={handleLogout}
              className='bg-transparent h-8 ml-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-4 border border-blue-500 hover:border-transparent rounded'
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink to='/login'>
            <button className='rounded-md bg-blue-600 py-2 px-4 border border-transparent text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 active:bg-blue-700 ml-2'>
              Log in
            </button>
          </NavLink>
        )}
      </div>
    </header>
  )
}

export default Navbar
