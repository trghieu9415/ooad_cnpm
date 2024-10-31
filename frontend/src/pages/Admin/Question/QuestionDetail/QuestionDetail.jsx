import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Content from '../../../../Components/Admin/components/Content'
import { useLocation } from 'react-router-dom'
import { formatRegistrationTime } from '../../../../helpers/formatRegistrationTime'
import { getQuestionById } from '../../../../apis/Admin/adminQuestion.api'

// Giả sử đây là dữ liệu câu trả lời
const answers = [
  {
    id: 1,
    author: 'John Doe',
    content: 'You can use Passport.js for authentication in Node.js',
    date: '11/10/2024'
  },
  { id: 2, author: 'Jane Smith', content: 'Try using JWT and bcrypt for secure authentication.', date: '11/10/2024' },
  { id: 3, author: 'Alice Green', content: 'Look into OAuth2 for additional security.', date: '11/10/2024' },
  { id: 4, author: 'Michael Brown', content: 'Consider using session tokens along with JWT.', date: '11/10/2024' }
  // Thêm các câu trả lời khác tại đây
]

const QuestionDetail = () => {
  const location = useLocation()
  const [question, setQuestion] = useState(null)
  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get('id') // Lấy giá trị của id
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setIsLoading(true)
        const response = await getQuestionById(id)
        setQuestion(response.data)
      } catch (error) {
        console.error('Error fetching the question:', error)
      } finally {
        setIsLoading(false)
      }
    }
    if (id) {
      fetchQuestion()
    }
  }, [id])
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!question) {
    return <div>No question found.</div>
  }
  return (
    <div className='p-4 mt-14 sm:ml-64 flex flex-col lg:flex-row gap-4 bg-gray-100 text-gray-500 dark:bg-gray-800 transition-all duration-300'>
      <Content>
        <h4 className='mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300'>Chi tiết câu hỏi</h4>
        {question && (
          <div className='flex flex-col lg:flex-row gap-4'>
            <div className='flex flex-col gap-4 w-full lg:w-3/4'>
              <div className='p-4 rounded-lg bg-white dark:bg-gray-700'>
                <label className='block text-sm font-medium text-gray-600 dark:text-gray-300'>Title</label>
                <p className='mt-1 text-gray-700 dark:text-gray-400'>{question.title}</p>

                <label className='mt-4 block text-sm font-medium text-gray-600 dark:text-gray-300'>Content</label>
                <textarea
                  className='w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none'
                  rows='4'
                  readOnly
                >
                  {question.question_text}
                </textarea>

                <div className='mt-4 flex items-center'>
                  <span className='text-sm font-medium text-gray-600 dark:text-gray-300 mr-2 leading-[23px]'>
                    Status:
                  </span>
                  {question.status === 'Open' ? (
                    <span className='px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:text-white dark:bg-green-600'>
                      {question.status}
                    </span>
                  ) : (
                    <span className='px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600'>
                      {question.status}
                    </span>
                  )}
                </div>
              </div>

              <div className='p-4 rounded-lg bg-white dark:bg-gray-700'>
                <label className='block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2'>Answers</label>
                <div className='space-y-4 max-h-60 overflow-y-auto'>
                  {answers.map((answer) => (
                    <div
                      key={answer.id}
                      className='p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800'
                      style={{
                        maxWidth: '100%',
                        overflowWrap: 'break-word',
                        wordWrap: 'break-word',
                        wordBreak: 'break-word'
                      }}
                    >
                      <div className='flex justify-between items-center'>
                        <span className='text-sm font-semibold text-gray-800 dark:text-gray-300'>{answer.author}</span>
                        <span className='text-xs text-gray-500 dark:text-gray-400'>{answer.date}</span>
                      </div>
                      <p className='mt-2 text-gray-700 dark:text-gray-400 break-words'>{answer.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-4 w-full lg:w-1/4'>
              <div className='p-4 rounded-lg bg-white dark:bg-gray-700'>
                <label className='block text-sm font-medium text-gray-800 dark:text-gray-300'>Member</label>
                <span className='block mt-1 text-gray-700 dark:text-gray-400'>Rebecca Wood</span>
                <label className='mt-4 block text-sm font-medium text-gray-800 dark:text-gray-300'>Reputation</label>
                <span className='block mt-1 text-gray-700 dark:text-gray-400'>45</span>
              </div>

              <div className='p-4 rounded-lg bg-white dark:bg-gray-700'>
                <label className='block text-sm font-medium text-gray-800 dark:text-gray-300'>Date Up</label>
                <span className='block mt-1 text-gray-700 dark:text-gray-400'>
                  {formatRegistrationTime(question.creation_time)}
                </span>
                <label className='mt-4 block text-sm font-medium text-gray-800 dark:text-gray-300'>Answers</label>
                <span className='block mt-1 text-gray-700 dark:text-gray-400'>32</span>
              </div>
            </div>
          </div>
        )}
      </Content>
    </div>
  )
}

export default QuestionDetail
