import http from '../../utils/http'

export const getCommentByQuestion = (id) => http.get(`admin/comment/by_question/${id}`)
