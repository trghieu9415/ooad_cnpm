import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Content from '../../../Components/Admin/components/Content'
import { getAllAnswer } from '../../../apis/Admin/adminAnswer.api'
import Pagination from '../../../Components/Pagination'
import { formatRegistrationTime } from '../../../helpers/formatRegistrationTime'
import config from '../../../config/routePath'
import { Link } from 'react-router-dom'
import { getMemberById } from '../../../apis/Admin/adminMember.api'
const Answer = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const columns = ['Answer content', 'Author', 'Date up', 'Flag', 'Question']
  const [answers, setAnswers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const answerPerPage = 5
  const indexOfLastAnswers = currentPage * answerPerPage
  const indexOfFirstAnswers = indexOfLastAnswers - answerPerPage
  const totalAnswers = answers.length
  const currentAnswers = answers.slice(indexOfFirstAnswers, indexOfLastAnswers)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [answersRes] = await Promise.all([getAllAnswer()])
        const fetchAuthor = async (member_id) => {
          const author = await getMemberById(member_id)
          return { name: author.data.name, reputation: author.data.reputation }
        }
        const answersWithAuthors = await Promise.all(
          answersRes.data.map(async (answer) => ({
            ...answer,
            author: (await fetchAuthor(answer.member_id)).name
          }))
        )
        setAnswers(answersWithAuthors)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className='text-gray-500 bg-gray-100 p-4 sm:ml-64 flex gap-2 flex-col lg:flex-row translate-all duration-300 mt-14 dark:bg-gray-800'>
        <Content>
          <h4 className='mt-1 mb-1 text-lg font-semibold text-gray-600 dark:text-gray-300'>Quản lí câu hỏi</h4>
          <div className='flex items-start mb-4'>
            <label className='flex items-center mr-4 '>
              <input
                type='checkbox'
                className={`appearance-none h-4 w-4 mr-1 rounded border-2 transition duration-300 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 checked:bg-purple-500 checked:border-purple-500'
                    : 'bg-white border-gray-300 checked:bg-purple-600 checked:border-purple-600'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  darkMode
                    ? 'focus:ring-offset-gray-800 focus:ring-purple-500'
                    : 'focus:ring-offset-white focus:ring-purple-600'
                }`}
              />
              Câu trả lời có gắn cờ
            </label>
            <label className='flex items-center'>
              <input
                type='checkbox'
                className={`appearance-none h-4 w-4 mr-1 rounded border-2 transition duration-300 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 checked:bg-purple-500 checked:border-purple-500'
                    : 'bg-white border-gray-300 checked:bg-purple-600 checked:border-purple-600'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  darkMode
                    ? 'focus:ring-offset-gray-800 focus:ring-purple-500'
                    : 'focus:ring-offset-white focus:ring-purple-600'
                }`}
              />
              Câu trả lời không gắn cờ
            </label>
          </div>

          <div className='w-full overflow-hidden rounded-lg shadow-xs'>
            <div className='w-full overflow-x-auto'>
              <table className='w-full whitespace-no-wrap'>
                <thead>
                  <tr className='text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800'>
                    {columns?.map((column, index) => (
                      <th key={index} className='px-4 py-3'>
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='bg-white divide-y dark:divide-gray-700 dark:bg-gray-800'>
                  {currentAnswers &&
                    currentAnswers.map((answer) => (
                      <tr key={answer.id} className='text-gray-700 dark:text-gray-400'>
                        <td className='px-4 py-3'>
                          <div className='flex items-center text-sm'>
                            <div>
                              <p className='font-semibold'>{answer.answer_text}</p>
                            </div>
                          </div>
                        </td>
                        <td className='px-4 py-3 text-sm'>{answer.author}</td>
                        <td className='px-4 py-3 text-sm'>{formatRegistrationTime(answer.creation_time)}</td>
                        <td className='px-4 py-3 text-xs'>
                          <span className='px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:text-white dark:bg-green-600'>
                            Yes
                          </span>
                        </td>
                        <td className='px-4 py-3'>
                          <Link
                            to={`${config.routes.adminQuestionDetail}?id=${answer.question_id}&answer_id=${answer.id}`}
                            className='flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                            aria-label='View Detail'
                          >
                            <button
                              className='flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                              aria-label='forward'
                            >
                              <svg className='w-6 h-6' aria-hidden='true' fill='none' viewBox='0 0 24 24'>
                                <path
                                  d='M8.0001 10.1308C9.61344 8.97671 11.4547 8.57075 13 8.57075V6.22616C13 5.26817 13 4.78917 13.2952 4.65662C13.5903 4.52407 13.9484 4.8423 14.6644 5.47875L18.6367 9.00968C20.2053 10.404 20.9896 11.1012 20.9896 11.9993C20.9896 12.8975 20.2053 13.5946 18.6367 14.989L14.6644 18.5199C13.9484 19.1563 13.5903 19.4746 13.2952 19.342C13 19.2095 13 18.7305 13 17.7725V15.4279C9.4 15.4279 5.5 17.1422 4 19.9993C4 17.5676 4.37726 15.621 5.0001 14.0735'
                                  stroke='currentColor'
                                  strokeWidth='1.5'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                              </svg>
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Pagination
              indexOfFirst={indexOfFirstAnswers}
              indexOfLast={indexOfLastAnswers}
              totalPost={totalAnswers}
              currentPage={currentPage}
              postPerPage={answerPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </Content>
      </div>
    </div>
  )
}

export default Answer
