import http from '../utils/http'

export const allQuestion = () => http.get('/question/')
export const detailQuestion = (id) => http.get(`/question/${id}`)
