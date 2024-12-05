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

export const HideAnswer = async (id, token) => {
  const response = await http.put(
    `/answer/hide/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response
}

export const BestAnswer = async (id, token) => {
  const response = await http.put(
    `/answer/${id}/correct`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response
}

export const BestAnswerByQuestion = async (id) => {
  const response = await http.get(`/answer/${id}/accepted-answers`)
  return response
}
