import { useNavigate, useParams } from 'react-router-dom'
import AllQuestions from './All'
import AskQuestion from './Ask'
import DetailQuestions from './Detail'

const Questions = () => {
  const { slug, id } = useParams()
  const navigate = useNavigate()

  const handleQuestionPage = () => {
    switch (slug) {
      case 'all':
        return <AllQuestions />
      case 'ask':
        return <AskQuestion />
      case 'id':
        return <DetailQuestions />
      default:
        navigate('/not-found')
    }
  }

  return <div>{slug !== 'all' ? <>{handleQuestionPage()}</> : handleQuestionPage()}</div>
}

export default Questions
