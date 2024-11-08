import { useEffect, useState } from 'react'
import { detailQuestionOfMember } from '../../../apis/question.api'

const Profile = ({ user }) => {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    if (user?.id) {
      detailQuestionOfMember(user.id)
        .then((response) => {
          setQuestions(response.data)
        })
        .catch((error) => {
          console.error('Error fetching questions:', error)
        })
    }
  }, [user?.id])

  const handleEdit = (questionId) => {
    console.log(`Edit question with ID: ${questionId}`)
  }

  return (
    <div className='min-h-screen flex justify-center items-start bg-gray-50 p-4'>
      <div className='max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 sm:p-8'>
        <div className='mt-4'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>Profile</h2>
          <div className='mb-4 pl-4'>
            <p className='text-gray-600'>
              <strong>Phone:</strong> {user?.phone || ''}
            </p>
            <p className='text-gray-600'>
              <strong>Email:</strong> {user?.email || ''}
            </p>
            <p className='text-gray-600'>
              <strong>Bio:</strong> {user?.biography || ''}
            </p>
          </div>
        </div>

        <div className='mt-4'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>Badges</h2>
          <div className='flex flex-wrap space-x-4'>
            {user.Badges && user.Badges.length > 0 ? (
              user.Badges.map((badge) => (
                <div key={badge.id} className='bg-gray-100 p-4 rounded-lg'>
                  <h3 className='font-semibold text-gray-700'>{badge.name}</h3>
                  <p className='text-gray-500'>{badge.description}</p>
                </div>
              ))
            ) : (
              <p className='text-gray-500'>No badges earned yet.</p>
            )}
          </div>
        </div>

        <div className='mt-4'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>Posts</h2>
          <ul className='space-y-4'>
            {questions.length > 0 ? (
              questions.map((question) => (
                <li key={question.id} className='p-4 border border-gray-200 rounded-lg'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h3 className='text-lg font-semibold text-gray-800'>{question.title}</h3>
                      <p className='text-gray-600 mb-2'>{question.question_text}</p>
                      <div className='flex space-x-2 mb-2'>
                        {question.Tags?.map((tag) => (
                          <span key={tag.id} className='px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>
                            {tag.name}
                          </span>
                        ))}
                      </div>
                      <p className='text-gray-500 text-sm'>
                        Published: {new Date(question.creation_time).toLocaleDateString()}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='text-gray-600 text-sm'>Votes: {question.voteCount}</p>
                      <p className='text-gray-600 text-sm'>Views: {question.viewCount}</p>
                      <button
                        onClick={() => handleEdit(question.id)}
                        className='mt-2 text-gray-100 text-sm hover:text-blue-300 bg-blue-500 p-2 rounded-lg'
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className='text-gray-500'>No questions posted yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile
