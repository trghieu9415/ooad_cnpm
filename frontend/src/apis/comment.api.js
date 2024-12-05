import http from '../utils/http'

export const commentQuestionById = (id) => http.get(`/comment/question/${id}`)
export const createCommentQuestionById = async (id, token, body) => {
  const response = await http.post(`/comment/question/${id}/create`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

export const HideComment = async (id, token) => {
  const response = await http.put(
    `/comment/hide/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response
}
