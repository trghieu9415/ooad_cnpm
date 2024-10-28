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

export const memberUpdate = (body) => http.post('/admin/account/login', body)

export const memberSave = (body) => http.post('/account/register', body)

export const memberFlagComment = (body) => http.post('/admin/account/login', body)

export const memberFlagQuestion = (body) => http.post('/account/login', body)

export const memberFlagAnswer = (body) => http.post('/admin/account/login', body)

export const memberVoteQuestion = (body) => http.post('/account/login', body)

export const memberVoteAnswer = (body) => http.post('/admin/account/login', body)
