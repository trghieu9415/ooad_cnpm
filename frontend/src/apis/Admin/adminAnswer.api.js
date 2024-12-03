import http from '../../utils/http'

export const getAnswerByQuestion = (id) => http.get(`admin/answer/question/${id}`)

export const getAllAnswer = () => http.get(`admin/answer/`)
