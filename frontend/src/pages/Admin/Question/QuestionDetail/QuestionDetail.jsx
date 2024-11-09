import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Content from '../../../../Components/Admin/components/Content'
import Button from '../../../../Components/Admin/components/Button'
import { formatRegistrationTime } from '../../../../helpers/formatRegistrationTime'
import { getQuestionById } from '../../../../apis/Admin/adminQuestion.api'
import { getAnswerByQuestion } from '../../../../apis/Admin/adminAnswer.api'
import { getMemberById } from '../../../../apis/Admin/adminMember.api'
import { getCommentByQuestion } from '../../../../apis/Admin/adminComment.api'
const QuestionDetail = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [question, setQuestion] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [answers, setAnswers] = useState([])
  const [comments, setComments] = useState([])
  const id = new URLSearchParams(location.search).get('id')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        const [questionResponse, answersResponse, commentsResponse] = await Promise.all([
          getQuestionById(id),
          getAnswerByQuestion(id),
          getCommentByQuestion(id)
        ])

        const fetchAuthor = async (member_id) => {
          const author = await getMemberById(member_id)
          return { name: author.data.name, reputation: author.data.reputation }
        }

        const questionAuthor = await fetchAuthor(questionResponse.data.member_id)
        setQuestion({ ...questionResponse.data, ...questionAuthor })

        const answersWithAuthors = await Promise.all(
          answersResponse.data.map(async (answer) => ({
            ...answer,
            author: (await fetchAuthor(answer.member_id)).name
          }))
        )
        setAnswers(answersWithAuthors)

        const commentsWithAuthors = await Promise.all(
          commentsResponse.data.map(async (comment) => ({
            ...comment,
            author: (await fetchAuthor(comment.member_id)).name
          }))
        )
        setComments(commentsWithAuthors)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) fetchData()
  }, [id])

  if (isLoading) return <div>Loading...</div>
  if (!question) return <div>No question found.</div>

  const RenderList = ({ items, label }) => (
    <div className='p-4 rounded-lg bg-white dark:bg-gray-700'>
      <label className='block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2'>{label}</label>
      <div className='space-y-4 max-h-60 overflow-y-auto'>
        {items.map((item) => (
          <div
            key={item.id}
            className='p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 break-words'
          >
            <div className='flex justify-between items-center'>
              <span className='text-sm font-semibold text-gray-800 dark:text-gray-300'>{item.author}</span>
              <span className='text-xs text-gray-500 dark:text-gray-400'>
                {formatRegistrationTime(item.creation_time)}
              </span>
            </div>
            <p className='mt-2 text-gray-700 dark:text-gray-400'>{item.answer_text || item.comment_text}</p>
          </div>
        ))}
      </div>
    </div>
  )

  const RenderQuestionDetails = () => (
    <div className='p-4 rounded-lg bg-white dark:bg-gray-700'>
      <label className='block text-sm font-medium text-gray-600 dark:text-gray-300'>Title</label>
      <p className='mt-1 text-gray-700 dark:text-gray-400'>{question.title}</p>

      <label className='mt-4 block text-sm font-medium text-gray-600 dark:text-gray-300'>Content</label>
      <textarea
        className='w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none'
        rows='4'
        readOnly
        value={question.question_text}
      />

      <div className='mt-4 flex items-center'>
        <span className='text-sm font-medium text-gray-600 dark:text-gray-300 mr-2 leading-[23px]'>Status:</span>
        <span
          className={`px-2 py-1 font-semibold leading-tight ${question.status === 'Open' ? 'text-green-700 bg-green-100 dark:text-white dark:bg-green-600' : 'text-orange-700 bg-orange-100 dark:text-white dark:bg-orange-600'} rounded-full`}
        >
          {question.status}
        </span>
      </div>
    </div>
  )

  const RenderSidebar = () => (
    <div className='flex flex-col gap-4 w-full lg:w-1/4'>
      <div className='p-4 rounded-lg bg-white dark:bg-gray-700'>
        <label className='block text-sm font-medium text-gray-800 dark:text-gray-300'>Member</label>
        <span className='block mt-1 text-gray-700 dark:text-gray-400'>{question.author}</span>
        <label className='mt-4 block text-sm font-medium text-gray-800 dark:text-gray-300'>Reputation</label>
        <span className='block mt-1 text-gray-700 dark:text-gray-400'>{question.reputation}</span>
      </div>
      <div className='p-4 rounded-lg bg-white dark:bg-gray-700'>
        <label className='block text-sm font-medium text-gray-800 dark:text-gray-300'>Date Up</label>
        <span className='block mt-1 text-gray-700 dark:text-gray-400'>
          {formatRegistrationTime(question.creation_time)}
        </span>
        <label className='mt-4 block text-sm font-medium text-gray-800 dark:text-gray-300'>Answers</label>
        <span className='block mt-1 text-gray-700 dark:text-gray-400'>{answers.length}</span>
        <label className='mt-4 block text-sm font-medium text-gray-800 dark:text-gray-300'>Comments</label>
        <span className='block mt-1 text-gray-700 dark:text-gray-400'>{comments.length}</span>
      </div>
    </div>
  )

  return (
    <div className='p-4 mt-14 sm:ml-64 flex flex-col lg:flex-row gap-4 bg-gray-100 text-gray-500 dark:bg-gray-800 transition-all duration-300'>
      <Content>
        <h4 className='my-1 text-lg font-semibold text-gray-600 dark:text-gray-300'>Chi tiết câu hỏi</h4>
        <Button left regular onClick={() => navigate(-1)}>
          Back
        </Button>
        <div className='flex flex-col lg:flex-row gap-4'>
          <div className='flex flex-col gap-4 w-full lg:w-3/4'>
            <RenderQuestionDetails />
            <RenderList items={answers} label='Answers' />
            <RenderList items={comments} label='Comments' />
          </div>
          <RenderSidebar />
        </div>
      </Content>
    </div>
  )
}

export default QuestionDetail
