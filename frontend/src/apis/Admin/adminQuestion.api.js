import http from '../../utils/http'

export const getAllQuestion = () => http.get('/admin/question')

export const getQuestionById = (id) => http.get(`/admin/question/${id}`)

export const handleStatusChange = (id, body) => http.put(`/admin/question/status/${id}`, body)
