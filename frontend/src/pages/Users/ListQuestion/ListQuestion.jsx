import { useEffect } from 'react'
import { detailQuestionOfMember } from '../../../apis/question.api'
import { useSelector } from 'react-redux'

const ListQuestion = () => {
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const fetchQuestionDetail = async () => {
      try {
        const response = await detailQuestionOfMember(user.id)
        console.log('Question detail:', response.data)
      } catch (error) {
        console.error('Error fetching question detail:', error)
      }
    }

    if (user) {
      fetchQuestionDetail()
    }
  }, [user])

  return <div>ListQuestion</div>
}

export default ListQuestion
