import http from '../utils/http'

export const answerQuestionById = (id) => http.get(`/answer/question/${id}`)
