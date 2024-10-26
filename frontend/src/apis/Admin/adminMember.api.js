import http from '../../utils/http'

export const getAllMember = () => http.get('/admin/member/')

export const toggleAccountStateMember = (id) => http.put(`/admin/member/block_account/${id}`)
