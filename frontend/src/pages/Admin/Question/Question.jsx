import { useSelector } from 'react-redux'
import Profile from '../../../Components/Admin/Profile/Profile'
import { FaSearch } from 'react-icons/fa'
import Content from '../../../Components/Admin/components/Content'
import { useEffect, useState } from 'react'
import { getAllQuestion, handleStatusChange } from '../../../apis/Admin/adminQuestion.api'
import Pagination from '../../../Components/Pagination'
import { formatRegistrationTime } from '../../../helpers/formatRegistrationTime'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { CiLock, CiUnlock } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import config from '../../../config/routePath'
import Toast from '../../../Components/Toast'
import { getAllTags } from '../../../apis/Admin/adminTag.api'
import { getAnswerByQuestion } from '../../../apis/Admin/adminAnswer.api'
export default function Question() {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [tags, setTags] = useState([])
  const questionPerPage = 5
  const indexOfLastQuestion = currentPage * questionPerPage
  const indexOfFirstQuestion = indexOfLastQuestion - questionPerPage
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionRes, tagsRes] = await Promise.all([getAllQuestion(), getAllTags()])
        const questionWithAnswerLength = await Promise.all(
          questionRes.data.map(async (question) => {
            const answers = await getAnswerByQuestion(question.id)
            return { ...question, answer_length: answers.data.length }
          })
        )
        setQuestions(questionWithAnswerLength)
        setTags(tagsRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  const filterQuestions = () => {
    return questions.filter((question) => {
      const matchesKeyword = question.title.toLowerCase().includes(searchKeyword.toLowerCase())
      const matchesTag = selectedTag ? question.Tags?.some((tag) => tag.id === selectedTag) : true
      return matchesKeyword && matchesTag
    })
  }
  const filteredQuestions = filterQuestions()
  const totalQuestion = filteredQuestions.length
  const currentQuestion = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion)

  const columns = ['Title question', 'Status', 'Date up', 'Actions']
  const handleStatus = async (question_id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Open' ? 'Close' : 'Open'
      await handleStatusChange(question_id, { status: newStatus, closing_remark: null })
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) => (question.id === question_id ? { ...question, status: newStatus } : question))
      )
      setStatus('success')
      setMessage(`Trạng thái câu hỏi đã được thay đổi thành ${newStatus}.`)
    } catch (error) {
      console.error('Error changing status:', error)
      // Cập nhật thông điệp lỗi
      setStatus('Error')
      setMessage('Đã xảy ra lỗi khi thay đổi trạng thái câu hỏi.')
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className='text-gray-500 bg-gray-100 p-4 sm:ml-64 flex gap-2 flex-col lg:flex-row translate-all duration-300 mt-14 dark:bg-gray-800'>
        <Content>
          <h4 className='mt-1 mb-1 text-lg font-semibold text-gray-600 dark:text-gray-300'>Thống kê câu hỏi</h4>
          <div className='flex flex-col items-start mb-4'>
            <div className='flex  items-center'>
              <input
                type='text'
                placeholder='Tìm kiếm câu hỏi...'
                className='border rounded-lg p-2 outline-none dark:divide-gray-700 dark:bg-gray-800'
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button className='ml-2 bg-purple-600 text-white px-4 rounded-lg h-9'>
                <FaSearch />
              </button>
            </div>
            <div className='mt-1 w-52'>
              <span className='text-gray-700 dark:text-gray-400'>Tags</span>
              <select
                className='block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray'
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                <option value=''>Tất cả thẻ</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
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
                  {currentQuestion &&
                    currentQuestion.map((question) => (
                      <tr key={question.id} className='text-gray-700 dark:text-gray-400'>
                        <td className='px-4 py-3'>
                          <div className='flex items-center text-sm'>
                            <div>
                              <p className='font-semibold'>{question.title}</p>
                              <p className='text-xs text-gray-600 dark:text-gray-400'>
                                {question.answer_length} answer
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className='px-4 py-3 text-xs'>
                          {question.status === 'Open' ? (
                            <span className='px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:text-white dark:bg-green-600'>
                              {question.status}
                            </span>
                          ) : (
                            <span className='px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600'>
                              {question.status}
                            </span>
                          )}
                        </td>
                        <td className='px-4 py-3 text-sm'>{formatRegistrationTime(question.creation_time)}</td>
                        <td className='px-4 py-3'>
                          <div className='flex items-center space-x-4 text-sm'>
                            <Link
                              to={`${config.routes.adminQuestionDetail}?id=${question.id}`}
                              className='flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                              aria-label='View Detail'
                            >
                              <AiOutlineExclamationCircle className='size-6' />
                            </Link>
                            <button
                              onClick={() => {
                                handleStatus(question.id, question.status)
                              }}
                              className='flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                              aria-label='Delete'
                            >
                              {question.status === 'Close' ? (
                                <CiUnlock className='size-6' />
                              ) : (
                                <CiLock className='size-6' />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Pagination
              indexOfFirst={indexOfFirstQuestion}
              indexOfLast={indexOfLastQuestion}
              totalPost={totalQuestion}
              currentPage={currentPage}
              postPerPage={questionPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </Content>
      </div>
      {message && <Toast status={status} message={message} />}
    </div>
  )
}
