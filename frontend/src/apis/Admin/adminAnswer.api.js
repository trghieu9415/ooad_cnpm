import http from '../../utils/http'

export const getAnswerByQuestion = (id) => http.get(`admin/answer/question/${id}`)

export const getAllAnswer = () => http.get(`admin/answer/`)

export const getAnswerById = (id) => http.get(`admin/answer/${id}`)

export const hideAnswer = async (id) => {
  const response = await http.put(`/answer/hide/${id}`)
  return response
}

export const showAnswer = async (id) => {
  const response = await http.put(`/answer/show/${id}`)
  return response
}
