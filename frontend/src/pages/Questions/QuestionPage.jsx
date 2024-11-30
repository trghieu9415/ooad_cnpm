import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AllQuestions from './All'
import AskQuestion from './Ask'
import DetailQuestions from './Detail'

const Questions = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const questionId = queryParams.get('questionId')

  const handleQuestionPage = () => {
    switch (slug) {
      case 'all':
        return <AllQuestions />
      case 'ask':
        return <AskQuestion />
      case 'id':
        if (questionId) {
          return <DetailQuestions id={questionId} />
        } else {
          navigate('/not-found')
          return null
        }
      default:
        navigate('/not-found')
        return null
    }
  }

  return <div>{handleQuestionPage()}</div>
}

export default Questions
