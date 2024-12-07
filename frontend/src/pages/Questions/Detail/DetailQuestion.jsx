import { useEffect, useState } from 'react'
import { detailQuestion, statusQuestion } from '../../../apis/question.api'
import { commentQuestionById, createCommentQuestionById, HideComment } from '../../../apis/comment.api'
import {
  answerQuestionById,
  BestAnswer,
  BestAnswerByQuestion,
  createAnswerQuestionById,
  HideAnswer,
  VoteResult
} from '../../../apis/answer.api'
import {
  memberById,
  memberFlagAnswer,
  memberFlagComment,
  memberFlagQuestion,
  memberSave,
  memberVoteAnswer,
  memberVoteQuestion
} from '../../../apis/member.api'
import { useSelector } from 'react-redux'
import { AiOutlineCheck } from 'react-icons/ai'
import { FaBookmark, FaBullseye, FaFlag, FaTimes, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
// import { getAllMemberFlag } from '../../../apis/flag.api'

const DetailQuestion = ({ id }) => {
  const [questionDetails, setQuestionDetails] = useState(null)
  const [askedByUser, setAskedByUser] = useState(null)
  const [comments, setComments] = useState([])
  const [answers, setAnswers] = useState([])
  const [newComment, setNewComment] = useState('')
  const [bestAnswerId, setBestAnswerId] = useState(null)
  const [newAnswer, setNewAnswer] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bountyAmount, setBountyAmount] = useState('')
  const [isModalFlag, setIsModalFlag] = useState(false)
  const [flaggingTarget, setFlaggingTarget] = useState(null)
  const [commentId, setCommentId] = useState(null)
  const [answerId, setAnswerId] = useState(null)
  const [bestAnswer, setBestAnswer] = useState(null)
  const [questionVote, setQuestionVote] = useState(null)
  const [answerVote, setAnswerVote] = useState([])
  const currentUser = useSelector((state) => state.user)

  const userToken = localStorage.getItem('UserToken')

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
        const sortedComments = commentsWithNames.sort((a, b) => new Date(b.creation_time) - new Date(a.creation_time))
        setComments(sortedComments)
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
        const sortedAnswers = answersWithNames.sort((a, b) => new Date(b.creation_time) - new Date(a.creation_time))
        setAnswers(sortedAnswers)
      })
      .catch((error) => console.error('Failed to fetch answers:', error))

    BestAnswerByQuestion(id)
      .then((data) => {
        const combinedObject = data.data.reduce((acc, curr) => ({ ...acc, ...curr }), {})
        setBestAnswer(combinedObject)
      })
      .catch((error) => {
        // console.error('Error fetching best answer:', error)
      })

    VoteResult(id, localStorage.getItem('UserToken'))
      .then((data) => {
        setQuestionVote(data.data.questionVote)
        setAnswerVote(data.data.answerVotes)
      })
      .catch((error) => {
        console.error('Error fetching best answer:', error)
      })
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

  const handleBestAnswerToggle = async (answerId) => {
    const token = localStorage.getItem('UserToken')

    if (bestAnswerId === answerId) {
      setBestAnswerId(null)
      return
    }

    try {
      await BestAnswer(answerId, token)
      setBestAnswerId(answerId)
      alert('Best answer set successfully!')
    } catch (error) {
      console.error('Failed to set best answer:', error)
      alert('Failed to set best answer, please try again later.')
    }
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleHideComment = async (id) => {
    const token = localStorage.getItem('UserToken')
    try {
      await HideComment(id, token)
      console.log(456)
    } catch (error) {
      console.log(error)
    }
  }

  const handleHideAnswer = async (id) => {
    const token = localStorage.getItem('UserToken')
    try {
      await HideAnswer(id, token)
      console.log(123)
    } catch (error) {
      console.log(error)
    }
  }

  const openModalFlag = (target, id) => {
    setFlaggingTarget(target)
    if (target == 'comment') {
      setCommentId(id)
    }
    if (target == 'answer') {
      setAnswerId(id)
    }
    setIsModalFlag(true)
  }

  const closeModalFlag = () => {
    setIsModalFlag(false)
    setFlaggingTarget(null)
    setAnswerId(null)
    setCommentId(null)
  }

  const handleFlag = async (targetId) => {
    const token = localStorage.getItem('UserToken')
    const body = { flag_type: true }
    try {
      if (flaggingTarget === 'question') {
        await memberFlagQuestion(targetId, body, token)
        alert('Question flagged successfully')
      } else if (flaggingTarget === 'comment') {
        await memberFlagComment(targetId, body, token)
        alert('Comment flagged successfully')
      } else if (flaggingTarget === 'answer') {
        await memberFlagAnswer(targetId, body, token)
        alert('Answer flagged successfully')
      }
    } catch (error) {
      console.error('Failed to flag:', error)
      alert('Failed to flag the item, please try again later.')
    }
    closeModalFlag()
  }

  const handleCloseQuestion = async () => {
    const token = localStorage.getItem('UserToken')
    const body = { status: 'Close' }
    try {
      await statusQuestion(questionDetails.id, body, token)
      alert('Câu hỏi đã đóng')
    } catch (error) {
      console.error('Failed to flag:', error)
      alert('Failed to flag the item, please try again later.')
    }
  }

  const handleBountyChange = (e) => {
    setBountyAmount(e.target.value)
  }

  const handleAddBounty = () => {
    alert('Thêm mức Bounty thành công')
  }

  const handleSaveQuestion = async (id, token) => {
    try {
      const response = await memberSave(id, token)
      console.log(response)
      if (response.status === 200) {
        toast.success('Lưu câu hỏi thành công')
        alert('Lưu câu hỏi thành công')
      } else {
        alert('Đã xảy ra lỗi khi cập nhật câu hỏi')
      }
    } catch (error) {
      console.error('Error saving question:', error)
      alert('Đã xảy ra lỗi, vui lòng thử lại sau')
    }
  }

  const handleVoteQuestion = async (voteType) => {
    const token = localStorage.getItem('UserToken')
    const body = {
      vote_type:
        voteType === 'up'
          ? questionVote === 'Upvote'
            ? 'Unvote'
            : 'Upvote'
          : questionVote === 'Downvote'
            ? 'Unvote'
            : 'Downvote'
    }
    try {
      await memberVoteQuestion(id, body, token)
      window.location.reload()
    } catch (error) {
      console.error('Failed to vote on question:', error)
    }
  }

  const handleVoteAnswer = async (answerId, voteType) => {
    const token = localStorage.getItem('UserToken')
    try {
      const idAns = answerVote.filter((item) => item.answer_id === answerId)
      console.log(idAns)
      const body = {
        vote_type:
          voteType === 'up'
            ? idAns[0].vote_type === 'Upvote'
              ? 'Unvote'
              : 'Upvote'
            : idAns[0].vote_type === 'Downvote'
              ? 'Unvote'
              : 'Downvote'
      }
      await memberVoteAnswer(answerId, body, token)
      window.location.reload()
    } catch (error) {
      console.error('Failed to vote on answer:', error)
    }
  }

  if (!questionDetails) {
    return <div>Loading...</div>
  }

  return (
    <div className='p-4 sm:p-8 bg-gray-50 min-h-screen flex justify-center items-start'>
      <div className='w-full max-w-2xl lg:max-w-4xl bg-white shadow-lg rounded-lg p-6 sm:p-8'>
        {currentUser.id === questionDetails.member_id && (
          <div className='float-right flex items-center space-x-2'>
            {/* <button onClick={openModal} className='p-2 text-black'>
              <FaBullseye />
            </button> */}
            {questionDetails.status !== 'Close' && (
              <button className='p-2 text-black' onClick={handleCloseQuestion}>
                <FaTimes />
              </button>
            )}
          </div>
        )}
        <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 leading-snug break-words'>
          {questionDetails.title}
        </h1>
        {isModalOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>Mức Bounty</h2>
              <input
                type='number'
                value={bountyAmount}
                onChange={handleBountyChange}
                className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500'
                placeholder='Enter bounty amount'
              />
              <div className='flex justify-end space-x-2'>
                <button
                  onClick={closeModal}
                  className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold'
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddBounty}
                  className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold'
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        )}
        {isModalFlag && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>Lí do</h2>
              <select className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500'>
                <option value='' disabled>
                  Select a reason
                </option>
                <option value='bug_report'>Bug Report</option>
                <option value='feature_request'>Feature Request</option>
                <option value='security_issue'>Security Issue</option>
                <option value='other'>Other</option>
              </select>

              <div className='flex justify-end space-x-2'>
                <button
                  onClick={closeModalFlag}
                  className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold'
                >
                  Hủy
                </button>
                <button
                  onClick={() =>
                    handleFlag(
                      flaggingTarget === 'question'
                        ? questionDetails.id
                        : flaggingTarget === 'comment'
                          ? commentId
                          : answerId
                    )
                  }
                  className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold'
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        )}
        <div className='flex flex-col sm:flex-row'>
          <div className='flex flex-col items-center sm:mr-6 mb-4 sm:mb-0'>
            <button
              className={`${questionVote === 'Upvote' ? 'text-green-500' : 'text-gray-400'} hover:text-blue-500 transition`}
              onClick={() => handleVoteQuestion('up')}
            >
              ▲
            </button>
            <span className='text-lg sm:text-2xl font-semibold text-gray-600 my-1 sm:my-2'>
              {questionDetails.voteCount}
            </span>
            <button
              className={`${questionVote === 'Downvote' ? 'text-red-500' : 'text-gray-400'} hover:text-blue-500 transition`}
              onClick={() => handleVoteQuestion('down')}
            >
              ▼
            </button>
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
            <div className='flex space-x-4 py-2'>
              <button
                className='p-2 text-black'
                onClick={() => {
                  handleSaveQuestion(questionDetails.id, localStorage.getItem('UserToken'))
                }}
              >
                <FaBookmark />
              </button>
              <button className='p-2 text-black' onClick={() => openModalFlag('question')}>
                <FaFlag />
              </button>
            </div>
          </div>
        </div>
        <div className='bg-gray-100 p-3 sm:p-4 rounded-lg shadow-inner mb-6 sm:mb-8'>
          {comments.map((comment) => {
            return (
              <div key={comment.id} className='py-2'>
                <p className='text-sm text-gray-700'>
                  <span className='font-semibold text-gray-800'>{comment.memberName}</span> - {comment.comment_text}
                </p>
                <div className='flex items-center space-x-2 mt-1'>
                  {!comment.comment_text.includes('[HIDDEN COMMENT]') && (
                    <button className='p-1 text-black text-sm' onClick={() => openModalFlag('comment', comment.id)}>
                      <FaFlag className='w-4 h-4' />
                    </button>
                  )}
                  {currentUser.id === comment.member_id && (
                    <div className='flex items-center space-x-2'>
                      {comment.comment_text !== '[HIDDEN COMMENT]' && (
                        <button
                          className='p-1 text-black text-sm'
                          onClick={() => {
                            handleHideComment(comment.id)
                          }}
                        >
                          <FaTrash className='w-4 h-4' />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        {questionDetails.status !== 'Close' && userToken && (
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
        )}
        <div className='mt-8 sm:mt-10'>
          {questionDetails.status !== 'Close' ||
            (answers.length > 0 && <h2 className='text-xl sm:text-2xl font-semibold text-gray-800'>Answers</h2>)}
          {answers.map((answer) => {
            const voteAnswer = answerVote.filter((item) => item.answer_id === answer.id)
            return (
              <div
                key={answer.id}
                className={`bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6 ${bestAnswerId === answer.id ? 'border-4 border-green-500' : ''}`}
              >
                <div className='flex'>
                  <div className='flex flex-col items-center mr-4 sm:mr-6'>
                    <button
                      className={`${voteAnswer && voteAnswer.length > 0 && voteAnswer[0].vote_type === 'Upvote' ? 'text-green-500' : 'text-gray-400'} hover:text-blue-500 transition`}
                      onClick={() => handleVoteAnswer(answer.id, 'up')}
                    >
                      ▲
                    </button>
                    <span className='text-lg font-semibold text-gray-600 my-1 sm:my-2'>{answer.voteCount}</span>
                    <button
                      className={`${voteAnswer && voteAnswer.length > 0 && voteAnswer[0].vote_type === 'Downvote' ? 'text-red-500' : 'text-gray-400'} hover:text-blue-500 transition`}
                      onClick={() => handleVoteAnswer(answer.id, 'down')}
                    >
                      ▼
                    </button>
                  </div>
                  <div className='flex-1'>
                    <p className='text-gray-700 mb-2 sm:mb-4'>{answer.answer_text}</p>
                    <p className='text-sm text-gray-500'>
                      Answered by <span className='font-semibold text-gray-700'>{answer.memberName}</span> on{' '}
                      {new Date(answer.creation_time).toLocaleDateString()}
                    </p>
                  </div>
                  {currentUser.id === questionDetails.member_id && (
                    <button onClick={() => handleBestAnswerToggle(answer.id)}>
                      <AiOutlineCheck
                        className={`text-2xl transition ${bestAnswer?.id === answer.id ? 'text-green-500 border border-green-500 rounded-xl' : 'text-gray-400'}`}
                      />
                    </button>
                  )}
                </div>
                <div className='flex items-center space-x-2 mt-1'>
                  {!answer.answer_text.includes('[HIDDEN ANSWER]') && (
                    <button className='p-1 text-black text-sm' onClick={() => openModalFlag('answer', answer.id)}>
                      <FaFlag className='w-4 h-4' />
                    </button>
                  )}
                  {currentUser.id === answer.member_id && (
                    <div className='flex items-center space-x-2'>
                      {answer.answer_text !== '[HIDDEN ANSWER]' && (
                        <button
                          className='p-1 text-black text-sm'
                          onClick={() => {
                            handleHideAnswer(answer.id)
                          }}
                        >
                          <FaTrash className='w-4 h-4' />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {questionDetails.status !== 'Close' && userToken && (
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
        )}
      </div>
    </div>
  )
}

export default DetailQuestion
