import http from '../../utils/http'

export const getAllMember = () => http.get('/admin/member/all')
