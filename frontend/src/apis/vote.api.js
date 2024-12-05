import http from '../utils/http'

export const getAllMemberVote = () => http.get('/vote/member-votes/')
