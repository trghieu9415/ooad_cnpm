import http from '../utils/http'

export const memberSelf = (body) => http.post('/account/register', body)

export const memberAll = (body) => http.get('/member/all', body)

export const memberUpdate = (body) => http.post('/admin/account/login', body)

export const memberSave = (body) => http.post('/account/register', body)

export const memberFlagComment = (body) => http.post('/admin/account/login', body)

export const memberFlagQuestion = (body) => http.post('/account/login', body)

export const memberFlagAnswer = (body) => http.post('/admin/account/login', body)

export const memberVoteQuestion = (body) => http.post('/account/login', body)

export const memberVoteAnswer = (body) => http.post('/admin/account/login', body)
