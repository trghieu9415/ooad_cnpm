import http from '../utils/http'

export const commentQuestionById = (id) => http.get(`/comment/question/${id}`)
