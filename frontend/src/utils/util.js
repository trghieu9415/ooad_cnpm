import axios from 'axios'

export function isAxiosError(error) {
  return axios.isAxiosError(error)
}

export function isAxiosErrorConflictError(error) {
  return isAxiosError(error) && error.response?.status === 409
}
export function isAxiosUnauthorizedError(error) {
  return isAxiosError(error) && error.response?.status === 401
}
