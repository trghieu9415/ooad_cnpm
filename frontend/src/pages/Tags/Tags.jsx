import { useState } from 'react'
import InputComponent from '../../Components/InputComponent'
import ButtonGroup from '../../Components/ButtonGroup'
import { useLocation } from 'react-router-dom'
import Tag from '../../Components/Tag'

const tagsData = [
  { name: 'JavaScript', questionCount: 1200, description: 'Programming language for web development.' },
  { name: 'React', questionCount: 800, description: 'A JavaScript library for building user interfaces.' },
  {
    name: 'CSS',
    questionCount: 600,
    description: 'Style sheet language for describing the presentation of a document.'
  },
  { name: 'Java', questionCount: 500, description: 'A high-level, class-based programming language.' }
]

const Tags = () => {
  const [search, setSearch] = useState('')

  const handleClearSearch = () => {
    setSearch('')
  }

  const buttonItems = ['Popular', 'Name', 'New']
  const location = useLocation()

  const handleTabClick = (item) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('tab', item)
    const newPath = `${location.pathname}?${searchParams.toString()}`
    window.history.pushState({}, '', newPath)
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-4'>Tags</h1>
      <p>
        A tag is a keyword or label that categorizes your question with other, similar questions. Using
        <br />
        the right tags makes it easier for others to find and answer your question.
      </p>
      <div className='m-5'></div>
      <div className='flex justify-between'>
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
            placeholder='Filter by tag name'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full border border-gray-400 rounded-lg overflow-hidden'
            classNameInput='border-none outline-none w-full pl-1 pr-10 text-lg h-8'
            iconClear={true}
            onClear={handleClearSearch}
          />
        </div>
        <ButtonGroup listItem={buttonItems} onClick={handleTabClick} />
      </div>
      <div className='m-5'></div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {tagsData.map((tag, index) => (
          <Tag key={index} tag={tag} />
        ))}
      </div>
    </div>
  )
}

export default Tags
