/* eslint-disable react-hooks/exhaustive-deps */
import { FaRegClock } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import ButtonGroup from '../../../Components/ButtonGroup'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { allQuestion } from '../../../apis/question.api'

const AllQuestions = () => {
  const [questionList, setQuestionList] = useState([])
  const [loading, setLoading] = useState(true)
  const buttonItems = ['All', 'Newest', 'Active', 'Bountied', 'Unanswered']
  const location = useLocation()

  const fetchQuestionsMutation = useMutation({
    mutationFn: allQuestion,
    onSuccess: (response) => {
      const transformedQuestions = response.data.map((question) => ({
        id: question.id,
        title: question.title,
        description: question.question_text,
        tags: question.Tags.map((tag) => tag.name),
        votes: question.voteCount,
        answers: question.flagCount,
        createdAt: new Date(question.creation_time).toLocaleDateString()
      }))
      setQuestionList(transformedQuestions)
      setLoading(false)
    },
    onError: (error) => {
      console.error('Failed to fetch questions:', error)
      setLoading(false)
    }
  })

  useEffect(() => {
    fetchQuestionsMutation.mutate()
  }, [])

  const handleTabClick = (item) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('tab', item)
    const newPath = `${location.pathname}?${searchParams.toString()}`
    window.history.pushState({}, '', newPath)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='container mx-auto px-5 py-5'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='md:col-span-2'>
          <div className='border border-gray-300 rounded-lg p-4'>
            <div className='flex justify-between items-center mb-6'>
              <h1 className='text-2xl md:text-3xl font-semibold'>All Questions</h1>
              <button
                onClick={() => (window.location.href = '/questions/ask')}
                className='bg-blue-600 text-white py-2 px-3 md:px-4 rounded-lg hover:bg-blue-700 transition duration-200 text-sm md:text-base'
              >
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
                    {/* <Link to={`/questions//id/${question.id}`}>
                      <h2 className='text-xl md:text-lg font-bold text-blue-600 hover:underline cursor-pointer'>
                        {question.title}
                      </h2>
                    </Link> */}
                    <Link to={`/questions/id`}>
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

export default AllQuestions
