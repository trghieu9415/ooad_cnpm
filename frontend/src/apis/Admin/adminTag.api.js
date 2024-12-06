import http from '../../utils/http'

export const getAllTags = () => http.get('/admin/tag')

export const createTag = (body) => http.post('/admin/tag/create', body)

export const updateTag = (id, body) => http.put(`/admin/tag/update/${id}`, body)

export const deleteTag = (id) => http.delete(`/admin/tag/delete/${id}`)
