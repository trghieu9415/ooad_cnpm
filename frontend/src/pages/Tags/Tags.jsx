import { useEffect, useState, useMemo } from 'react'
import InputComponent from '../../Components/InputComponent'
import Tag from '../../Components/Tag'
import { AllTag } from '../../apis/tag.api'
import useDebounce from '../../hooks/useDebounce'

const Tags = () => {
  const [search, setSearch] = useState('')
  const [tagsData, setTagsData] = useState([])

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await AllTag()
        setTagsData(response.data)
      } catch (error) {
        console.error('Error fetching tags:', error)
      }
    }

    fetchTags()
  }, [])

  const debouncedSearchTerm = useDebounce(search, 300)

  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm) return tagsData
    return tagsData.filter((tag) => tag.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
  }, [debouncedSearchTerm, tagsData])

  const handleClearSearch = () => {
    setSearch('')
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
      </div>
      <div className='m-5'></div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {searchResults.map((tag) => (
          <Tag key={tag.id} tag={{ name: tag.name, description: tag.description }} />
        ))}
      </div>
    </div>
  )
}

export default Tags
