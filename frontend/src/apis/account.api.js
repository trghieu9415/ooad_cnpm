import http from '../utils/http'

export const registerAccount = (body) => http.post('/account/register', body)

export const loginAccount = (body) => http.post('/account/login', body)

export const loginAccountAdmin = (body) => http.post('/admin/account/login', body)

export const ChangePasswordUser = async (body, token) => {
  const response = await http.put('/account/changepassword', body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}
