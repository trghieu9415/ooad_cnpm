import http from '../../utils/http'

export const getAllMember = () => http.get('/admin/member/')

export const toggleAccountStateMember = (id) => http.put(`/admin/member/block_account/${id}`)

export const updateInfoMember = (id, body) => http.put(`/admin/member/update/${id}`, body)
