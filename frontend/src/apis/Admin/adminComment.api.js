import http from '../../utils/http'

export const getCommentByQuestion = (id) => http.get(`admin/comment/by_question/${id}`)

export const getCommentById = (id) => http.get(`admin/comment/${id}`)

export const hideComment = async (id) => {
  const response = await http.put(`/comment/hide/${id}`)
  return response
}

export const showComment = async (id) => {
  const response = await http.put(`/comment/show/${id}`)
  return response
}
