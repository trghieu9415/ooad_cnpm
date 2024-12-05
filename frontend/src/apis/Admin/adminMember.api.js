import http from '../../utils/http'

export const getAllMember = () => http.get('/admin/member/')

export const toggleAccountStateMember = (id) => http.put(`/admin/member/block_account/${id}`)

export const updateInfoMember = (id, body) => http.put(`/admin/member/update/${id}`, body)

export const getMemberById = (id) => http.get(`admin/member/${id}`)

export const memberFlagComment = async (id, body, member_id) => {
  const response = await http.post(`/admin/member/flag/comment/${id}`, body, {
    headers: {
      memberid: member_id
    }
  })
  return response
}
export const memberFlagQuestion = async (id, body, member_id) => {
  const response = await http.post(`/admin/member/flag/question/${id}`, body, {
    headers: {
      memberid: member_id
    }
  })
  return response
}
export const memberFlagAnswer = async (id, body, member_id) => {
  const response = await http.post(`/admin/member/flag/answer/${id}`, body, {
    headers: {
      memberid: member_id
    }
  })
  return response
}
