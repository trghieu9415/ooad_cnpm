const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY
const refreshSecretKey = process.env.REFRESH_KEY

// Hàm generateToken cho người dùng thường
const generateToken = (account_id, member_id) => {
  return jwt.sign({ account_id, member_id }, secretKey, { expiresIn: '1d' }) // accessToken hết hạn sau 15 phút
}

const generateTokenAdmin = (id, username) => {
  return jwt.sign({ id, username }, secretKey, { expiresIn: '1h' })
}
module.exports = { generateToken, generateTokenAdmin }
