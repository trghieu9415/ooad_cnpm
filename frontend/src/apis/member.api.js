import http from '../utils/http'

export const memberSelf = async (token) => {
  const response = await http.get('/member/self', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

export const memberAll = () => http.get('/member/all')

export const memberUpdate = async (body, token) => {
  const response = await http.put('/member/update', body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

export const memberById = (id) => http.get(`/member/${id}`)

export const memberSave = (id, token) =>
  http.post(
    `/member/save/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

export const memberFlagComment = (id, body, token) =>
  http.post(`/member/flag/comment/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

export const memberFlagQuestion = (id, body, token) =>
  http.post(`/member/flag/question/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

export const memberFlagAnswer = (id, body, token) =>
  http.post(`/member/flag/answer/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

export const memberVoteQuestion = (id, body, token) =>
  http.post(`/member/vote/question/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

export const memberVoteAnswer = (id, body, token) =>
  http.post(`/member/vote/answer/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
