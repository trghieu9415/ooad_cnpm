import http from '../utils/http'

export const allQuestion = () => http.get('/question/')
