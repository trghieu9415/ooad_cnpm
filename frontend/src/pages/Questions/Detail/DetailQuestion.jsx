import { useEffect, useState } from 'react'
import { detailQuestion } from '../../../apis/question.api'
import { memberById } from '../../../apis/member.api'

const DetailQuestion = ({ id }) => {
  const [questionDetails, setQuestionDetails] = useState(null)
  const [askedByUser, setAskedByUser] = useState(null)

  useEffect(() => {
    detailQuestion(id)
      .then((response) => {
        setQuestionDetails(response.data)
        return memberById(response.data.member_id)
      })
      .then((response) => {
        setAskedByUser(response.data.name)
      })
      .catch((error) => {
        console.error('Failed to fetch details:', error)
      })
  }, [id])

  if (!questionDetails) {
    return <div>Loading...</div>
  }

  return (
    <div className='p-4 sm:p-8 bg-gray-50 min-h-screen flex justify-center items-start'>
      <div className='w-full max-w-2xl lg:max-w-4xl bg-white shadow-lg rounded-lg p-6 sm:p-8'>
        <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 leading-snug break-words'>
          {questionDetails.title}
        </h1>

        <div className='flex flex-col sm:flex-row mb-6 sm:mb-8'>
          <div className='flex flex-col items-center sm:mr-6 mb-4 sm:mb-0'>
            <button className='text-gray-400 hover:text-blue-500 transition'>▲</button>
            <span className='text-lg sm:text-2xl font-semibold text-gray-600 my-1 sm:my-2'>
              {questionDetails.voteCount}
            </span>
            <button className='text-gray-400 hover:text-blue-500 transition'>▼</button>
          </div>

          <div className='flex-1'>
            <p className='text-gray-700 mb-4 sm:mb-6'>{questionDetails.question_text}</p>

            <div className='flex flex-wrap gap-2 mb-4 sm:mb-6'>
              {questionDetails.Tags.map((tag) => (
                <span
                  key={tag.id}
                  className='bg-blue-100 text-blue-600 rounded-full px-3 sm:px-4 py-1 text-sm font-semibold'
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <p className='text-sm text-gray-500'>
              Asked by <span className='font-semibold text-gray-700'>{askedByUser}</span> on{' '}
              {new Date(questionDetails.update_time || questionDetails.creation_time).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className='bg-gray-100 p-3 sm:p-4 rounded-lg shadow-inner mb-6 sm:mb-8'>
          <p className='text-sm text-gray-700 mb-1 sm:mb-2'>
            <span className='font-semibold text-gray-800'>User456</span> - Have you tried checking your SQL syntax?
          </p>
          <p className='text-sm text-gray-700'>
            <span className='font-semibold text-gray-800'>User789</span> - I had a similar issue; updating Hibernate
            fixed it.
          </p>
        </div>

        <div className='mt-8 sm:mt-10'>
          <h2 className='text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6'>Answers</h2>

          <div className='bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6'>
            <div className='flex'>
              <div className='flex flex-col items-center mr-4 sm:mr-6'>
                <button className='text-gray-400 hover:text-blue-500 transition'>▲</button>
                <span className='text-lg font-semibold text-gray-600 my-1 sm:my-2'>3</span>
                <button className='text-gray-400 hover:text-blue-500 transition'>▼</button>
              </div>

              <div className='flex-1'>
                <p className='text-gray-700 mb-2 sm:mb-4'>
                  I encountered this issue before; it was due to a version mismatch. Try upgrading to the latest
                  Hibernate version.
                </p>
                <p className='text-sm text-gray-500'>
                  Answered by <span className='font-semibold text-gray-700'>User456</span> on October 28, 2024
                </p>
              </div>
            </div>
          </div>

          <div className='mt-6 sm:mt-10'>
            <h3 className='text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4'>Your Answer</h3>
            <textarea
              className='w-full h-32 sm:h-40 p-3 sm:p-4 border border-gray-300 rounded-lg mb-3 sm:mb-4 focus:outline-none focus:border-blue-500 transition'
              placeholder='Write your answer here...'
            />
            <button className='px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold'>
              Post Your Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailQuestion
