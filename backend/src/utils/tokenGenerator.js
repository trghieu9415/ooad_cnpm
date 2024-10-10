const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

const generateToken = (account_id, member_id) => {
  return jwt.sign({ account_id, member_id }, secretKey, { expiresIn: '158h' })
}

module.exports = generateToken
