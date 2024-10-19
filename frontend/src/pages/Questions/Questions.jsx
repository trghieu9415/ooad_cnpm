import { FaRegClock } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import ButtonGroup from '../../Components/ButtonGroup'

const Questions = () => {
  const questionList = [
    {
      id: 1,
      title: 'How to implement authentication in Next.js?',
      description: 'I want to implement JWT-based authentication in Next.js and need some guidance.',
      tags: ['next.js', 'authentication', 'jwt'],
      votes: 10,
      answers: 2,
      createdAt: '2024-10-10'
    },
    {
      id: 2,
      title: 'What is the best state management for React?',
      description: 'I am looking for recommendations on state management libraries for large React applications.',
      tags: ['react', 'redux', 'state-management'],
      votes: 5,
      answers: 3,
      createdAt: '2024-10-08'
    },
    {
      id: 3,
      title: 'How to style components using Tailwind CSS?',
      description: 'I need help understanding the best practices when using Tailwind CSS with React components.',
      tags: ['tailwindcss', 'react', 'css'],
      votes: 15,
      answers: 1,
      createdAt: '2024-10-05'
    }
  ]

  const buttonItems = ['All', 'Newest', 'Active', 'Bountied', 'Unanswered']
  const location = useLocation()

  const handleTabClick = (item) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('tab', item)
    const newPath = `${location.pathname}?${searchParams.toString()}`
    window.history.pushState({}, '', newPath)
  }

  return (
    <div className='container mx-auto px-5 py-5'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='md:col-span-2'>
          <div className='border border-gray-300 rounded-lg p-4'>
            <div className='flex justify-between items-center mb-6'>
              <h1 className='text-2xl md:text-3xl font-semibold'>All Questions</h1>
              <button className='bg-blue-600 text-white py-2 px-3 md:px-4 rounded-lg hover:bg-blue-700 transition duration-200 text-sm md:text-base'>
                Ask Question
              </button>
            </div>

            <div className='flex flex-col justify-between items-center lg:flex-row'>
              <span>{questionList.length} questions</span>
              <ButtonGroup listItem={buttonItems} onClick={handleTabClick} />
            </div>

            <div className='mt-4'>
              {questionList.map((question) => (
                <div
                  key={question.id}
                  className='border border-gray-300 rounded-lg p-4 mb-4 flex flex-col md:flex-row hover:shadow-lg transition-shadow duration-300 gap-3'
                >
                  <div className='flex-shrink-0 ml-0 md:ml-4 text-center'>
                    <span className='block font-semibold'>{question.answers} answers</span>
                    <span className='block font-semibold'>{question.votes} votes</span>
                  </div>
                  <div className='flex-1'>
                    <Link to={`/questions/${question.id}`}>
                      <h2 className='text-xl md:text-lg font-bold text-blue-600 hover:underline cursor-pointer'>
                        {question.title}
                      </h2>
                    </Link>
                    <p className='text-gray-700 mt-2 text-sm md:text-base'>{question.description}</p>
                    <div className='flex items-center justify-between mt-4'>
                      <div className='flex flex-wrap space-x-2'>
                        {question.tags.map((tag, index) => (
                          <span
                            key={index}
                            className='bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs md:text-sm mr-2'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className='flex items-center space-x-1 text-gray-500 text-xs md:text-sm'>
                        <FaRegClock />
                        <span>{question.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='hidden md:block'>
          <div className='border border-gray-300 rounded-lg p-4'>
            <h3 className='text-lg font-semibold mb-4'>Top Tags</h3>
            <div className='flex flex-wrap gap-2'>
              {['next.js', 'react', 'tailwindcss', 'redux', 'authentication'].map((tag, index) => (
                <Link key={index} to={`/tags/${tag}`}>
                  <span className='bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-300 cursor-pointer'>
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Questions
