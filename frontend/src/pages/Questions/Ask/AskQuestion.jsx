import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { askQuestion } from '../../../apis/question.api'
import { useNavigate } from 'react-router-dom'
import { AllTag } from '../../../apis/tag.api'
import TagModal from '../../../Components/TagModal'
import Toast from '../../../Components/Toast'

const AskQuestion = () => {
  const [title, setTitle] = useState('')
  const [questionText, setQuestionText] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [tags, setTags] = useState([])
  const [isTagModalOpen, setIsTagModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastStatus, setToastStatus] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // lấy danh sách tag
    const fetchTags = async () => {
      try {
        const response = await AllTag()
        setTags(response.data)
      } catch (error) {
        console.error('Error fetching tags:', error)
      }
    }

    fetchTags()
  }, [])

  // gọi api Đăng câu hỏi
  const mutation = useMutation({
    mutationFn: async (questionData) => {
      const token = localStorage.getItem('UserToken')
      const response = await askQuestion(questionData, token)
      return response
    },
    onSuccess: () => {
      navigate('/questions/all')
    },
    onError: (error) => {
      console.error('Error posting question:', error)
    }
  })

  const handleSubmit = () => {
    // if (!title || !questionText || !attemptedSolutions || selectedTags.length === 0) {
    if (!title || !questionText || selectedTags.length === 0) {
      setToastMessage('All fields are required.')
      setToastStatus('warn')
      return
    }

    const questionData = {
      title,
      question_text: questionText,
      tags: selectedTags.map((tag) => ({ id: tag.id }))
    }

    mutation.mutate(questionData)
  }

  const handleTagChange = (newSelectedTags) => {
    if (newSelectedTags.length <= 5) {
      setSelectedTags(newSelectedTags)
    } else {
      setToastMessage('You can select up to 5 tags only.')
      setToastStatus('error')
    }
  }

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage('')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  return (
    <div className='p-8 bg-gray-100 min-h-screen'>
      <div className='max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8'>
        <h1 className='text-3xl font-bold mb-6'>Ask a public question</h1>

        <div className='space-y-6'>
          <div>
            <label className='block font-semibold text-lg mb-1'>Title</label>
            <input
              type='text'
              className='w-full border border-gray-300 rounded-lg p-2'
              placeholder="Be specific and imagine you're asking a question to another person"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className='text-sm text-gray-500 mt-1'>Use a short and descriptive title to summarize your question.</p>
          </div>

          <div>
            <label className='block font-semibold text-lg mb-1'>What are the details of your problem?</label>
            <textarea
              className='w-full border border-gray-300 rounded-lg p-2 h-32'
              placeholder='Include all the information someone would need to answer your question'
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            <p className='text-sm text-gray-500 mt-1'>
              Explain what you are trying to achieve and the expected outcome.
            </p>
          </div>

          {/* <div>
            <label className='block font-semibold text-lg mb-1'>What did you try and what were you expecting?</label>
            <textarea
              className='w-full border border-gray-300 rounded-lg p-2 h-32'
              placeholder="Describe any attempts you've made to solve the problem"
              value={attemptedSolutions}
              onChange={(e) => setAttemptedSolutions(e.target.value)}
            />
            <p className='text-sm text-gray-500 mt-1'>
              Mention solutions you have tried and explain why they didn’t work.
            </p>
          </div> */}

          <div>
            <label className='block font-semibold text-lg mb-1'>Tags</label>
            <button
              onClick={() => setIsTagModalOpen(true)}
              className='border border-gray-300 rounded-lg p-2 w-full text-left'
            >
              {selectedTags.length > 0
                ? `Selected Tags: ${selectedTags.map((tag) => tag.name).join(', ')}`
                : 'Select Tags'}
            </button>
            <p className='text-sm text-gray-500 mt-1'>
              Select relevant tags to help categorize your question (e.g., react, javascript).
            </p>
          </div>

          <div className='flex justify-between items-center mt-8'>
            <button
              onClick={handleSubmit}
              className='bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700'
            >
              Post Your Question
            </button>
          </div>
        </div>
      </div>

      <TagModal
        isOpen={isTagModalOpen}
        onClose={() => setIsTagModalOpen(false)}
        tags={tags}
        selectedTags={selectedTags}
        onTagChange={handleTagChange}
      />

      {toastMessage && <Toast status={toastStatus} message={toastMessage} position='bottom-right' />}
    </div>
  )
}

export default AskQuestion
