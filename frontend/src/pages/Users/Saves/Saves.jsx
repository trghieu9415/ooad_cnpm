import { useEffect, useState } from 'react'
import { memberSaveByUser, removeSavedQuestion } from '../../../apis/member.api'

const Saves = () => {
  const [savedQuestions, setSavedQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSavedQuestions = async () => {
      try {
        const token = localStorage.getItem('UserToken')
        const response = await memberSaveByUser(token)
        console.log(response)
        setSavedQuestions(response.data)
      } catch (err) {
        // setError('Chưa có danh sách lưu')
      } finally {
        setLoading(false)
      }
    }

    fetchSavedQuestions()
  }, [])

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-red-500'>{error}</p>
      </div>
    )
  }

  const handleRemoveSaveQuestion = async (memberViewId) => {
    try {
      await removeSavedQuestion(memberViewId) // Gọi API để hủy lưu câu hỏi
      // Cập nhật state: Loại bỏ câu hỏi vừa xóa khỏi danh sách
      setSavedQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== memberViewId))
    } catch (err) {
      setError('Không thể xóa câu hỏi.')
    }
  }

  return (
    <div className='p-4 sm:p-8 bg-gray-50 min-h-screen flex justify-center items-start'>
      <div className='max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 sm:p-8'>
        <h1 className='text-xl sm:text-2xl font-bold text-gray-800 mb-6'>Saved Questions</h1>

        {savedQuestions.length > 0 ? (
          <div className='space-y-6'>
            {savedQuestions.map((question) => (
              <div
                key={question.id}
                className='border-b border-gray-200 pb-4 mb-6 last:border-none last:pb-0 last:mb-0'
              >
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start'>
                  <div className='flex-1'>
                    <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 leading-snug break-all'>
                      {question.Question.title}
                    </h2>
                    {/* <p className='text-gray-600 text-sm mt-1 mb-2'>
                      Saved on {new Date(question.Question.creation_time).toLocaleDateString()}
                    </p> */}
                    <p className='text-gray-700 text-sm'>{question.Question.question_text}</p>
                  </div>

                  <div className='mt-4 sm:mt-0 sm:ml-4 flex items-center space-x-4 text-gray-500 text-sm'>
                    <button
                      type='button'
                      onClick={() => handleRemoveSaveQuestion(question.id)}
                      className='hover:text-blue-600 transition'
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-600'>No saved questions found.</p>
        )}
      </div>
    </div>
  )
}

export default Saves
