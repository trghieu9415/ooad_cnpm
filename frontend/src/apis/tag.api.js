import http from '../utils/http'

export const AllTag = () => http.get('/tag')

export const getTagById = (id) => http.get(`/tag/${id}`)

export const createTag = (body) => http.post('/tag/create', body)

export const editTag = (id) => http.put(`/tag/update/${id}`)
