import http from '../../utils/http'

export const getAllFlagContent = () => http.get(`admin/flag/get-all`)
