import http from '../utils/http'

export const AllTag = () => http.get('/tag')
