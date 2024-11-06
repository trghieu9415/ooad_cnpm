import http from '../utils/http'

export const allQuestion = () => http.get('/question/')
export const detailQuestion = (id) => http.get(`/question/${id}`)
export const detailQuestionOfMember = (id) => http.get(`/question/member/${id}`)
export const askQuestion = async (body, token) => {
  const response = await http.post('/question/create', body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}
