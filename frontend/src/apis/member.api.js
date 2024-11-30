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

export const memberSave = (id) => http.post(`/member/save/${id}}`)

export const memberFlagComment = (body) => http.post('/admin/account/login', body)

export const memberFlagQuestion = (body) => http.post('/account/login', body)

export const memberFlagAnswer = (body) => http.post('/admin/account/login', body)

export const memberVoteQuestion = (body) => http.post('/account/login', body)

export const memberVoteAnswer = (body) => http.post('/admin/account/login', body)
