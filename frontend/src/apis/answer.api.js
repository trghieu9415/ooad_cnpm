import http from '../utils/http'

export const answerQuestionById = (id) => http.get(`/answer/question/${id}`)
export const createAnswerQuestionById = async (id, token, body) => {
  const response = await http.post(`/answer/question/${id}/create`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}
