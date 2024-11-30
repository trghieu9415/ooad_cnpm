import { useEffect, useState } from 'react'
import { detailQuestion } from '../../../apis/question.api'
import { commentQuestionById, createCommentQuestionById } from '../../../apis/comment.api'
import { answerQuestionById, createAnswerQuestionById } from '../../../apis/answer.api'
import { memberById } from '../../../apis/member.api'
import { useSelector } from 'react-redux'
import { AiOutlineCheck } from 'react-icons/ai'

const DetailQuestion = ({ id }) => {
  const [questionDetails, setQuestionDetails] = useState(null)
  const [askedByUser, setAskedByUser] = useState(null)
  const [comments, setComments] = useState([])
  const [answers, setAnswers] = useState([])
  const [newComment, setNewComment] = useState('')
  const [bestAnswerId, setBestAnswerId] = useState(null)
  const [newAnswer, setNewAnswer] = useState('')
  const currentUser = useSelector((state) => state.user)

  useEffect(() => {
    detailQuestion(id)
      .then((response) => {
        setQuestionDetails(response.data)
        return memberById(response.data.member_id)
      })
      .then((response) => {
        setAskedByUser(response.data.name)
      })
      .catch((error) => console.error('Failed to fetch question details or author:', error))

    commentQuestionById(id)
      .then(async (response) => {
        const commentsWithNames = await Promise.all(
          response.data.map(async (comment) => {
            const memberResponse = await memberById(comment.member_id)
            return {
              ...comment,
              memberName: memberResponse.data.name
            }
          })
        )
        setComments(commentsWithNames)
      })
      .catch((error) => console.error('Failed to fetch comments:', error))

    answerQuestionById(id)
      .then(async (response) => {
        const answersWithNames = await Promise.all(
          response.data.map(async (answer) => {
            const memberResponse = await memberById(answer.member_id)
            return {
              ...answer,
              memberName: memberResponse.data.name
            }
          })
        )
        setAnswers(answersWithNames)
      })
      .catch((error) => console.error('Failed to fetch answers:', error))
  }, [id])

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    try {
      const response = await createCommentQuestionById(id, localStorage.getItem('UserToken'), {
        content_text: newComment
      })
      const addedComment = {
        ...response.data,
        memberName: currentUser.name
      }
      setComments([...comments, addedComment])
      setNewComment('')
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }

  const handleAddAnswer = async () => {
    if (!newAnswer.trim()) return
    try {
      const response = await createAnswerQuestionById(id, localStorage.getItem('UserToken'), {
        answer_text: newAnswer
      })
      const addedAnswer = {
        ...response.data,
        memberName: currentUser.name
      }
      setAnswers([...answers, addedAnswer])
      setNewAnswer('')
    } catch (error) {
      console.error('Failed to add answer:', error)
    }
  }

  const handleBestAnswerToggle = (answerId) => {
    setBestAnswerId((prev) => (prev === answerId ? null : answerId))
  }

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
          {comments.map((comment) => (
            <p key={comment.id} className='text-sm text-gray-700 mb-1 sm:mb-2'>
              <span className='font-semibold text-gray-800'>{comment.memberName}</span> - {comment.comment_text}
            </p>
          ))}
        </div>

        <div className='mb-6 sm:mb-8'>
          <textarea
            className='w-full h-20 p-3 sm:p-4 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-blue-500 transition'
            placeholder='Add a comment...'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold'
            onClick={handleAddComment}
          >
            Post Comment
          </button>
        </div>

        <div className='mt-8 sm:mt-10'>
          <h2 className='text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6'>Answers</h2>
          {answers.map((answer) => (
            <div key={answer.id} className='bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6'>
              <div className='flex'>
                <div className='flex flex-col items-center mr-4 sm:mr-6'>
                  <button className='text-gray-400 hover:text-blue-500 transition'>▲</button>
                  <span className='text-lg font-semibold text-gray-600 my-1 sm:my-2'>{answer.voteCount}</span>
                  <button className='text-gray-400 hover:text-blue-500 transition'>▼</button>
                </div>
                <div className='flex-1'>
                  <p className='text-gray-700 mb-2 sm:mb-4'>{answer.answer_text}</p>
                  <p className='text-sm text-gray-500'>
                    Answered by <span className='font-semibold text-gray-700'>{answer.memberName}</span> on{' '}
                    {new Date(answer.creation_time).toLocaleDateString()}
                  </p>
                </div>
                <button onClick={() => handleBestAnswerToggle(answer.id)}>
                  <AiOutlineCheck
                    className={`text-2xl transition ${bestAnswerId === answer.id ? 'text-green-500' : 'text-gray-400'}`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-6 sm:mt-10'>
          <h3 className='text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4'>Your Answer</h3>
          <textarea
            className='w-full h-32 sm:h-40 p-3 sm:p-4 border border-gray-300 rounded-lg mb-3 sm:mb-4 focus:outline-none focus:border-blue-500 transition'
            placeholder='Write your answer here...'
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button
            className='px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold'
            onClick={handleAddAnswer}
          >
            Post Your Answer
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetailQuestion
