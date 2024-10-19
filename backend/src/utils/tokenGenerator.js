const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY
const refreshSecretKey = process.env.REFRESH_KEY

// Hàm generateToken cho người dùng thường
const generateToken = (account_id, member_id) => {
  return jwt.sign({ account_id, member_id }, secretKey, { expiresIn: '15m' }) // accessToken hết hạn sau 15 phút
}

// Hàm generateToken cho admin
const generateTokenAdmin = (id, username) => {
  return jwt.sign({ id, username }, secretKey, { expiresIn: '5s' }) // accessToken cho admin hết hạn sau 1 phút
}

// // Hàm generateRefreshToken để cấp refreshToken
// const generateRefreshToken = (id, username) => {
//   return jwt.sign({ id, username }, refreshSecretKey, { expiresIn: '7d' }) // refreshToken có thời hạn 7 ngày
// }

// // Hàm refreshToken để lấy accessToken mới từ refreshToken
// const refreshToken = (refreshToken) => {
//   try {
//     // Xác minh refreshToken
//     console.log('Refresh token', refreshToken)

//     const adminData = jwt.verify(refreshToken, refreshSecretKey)

//     // Nếu hợp lệ, tạo một accessToken mới
//     const newAccessToken = jwt.sign(
//       { id: adminData.id, username: adminData.username },
//       secretKey,
//       { expiresIn: '15m' } // accessToken mới có thời hạn 15 phút
//     )

//     return { accessToken: newAccessToken }
//   } catch (error) {
//     throw new Error('Refresh token không hợp lệ hoặc đã hết hạn')
//   }
// }

module.exports = generateToken
// generateTokenAdmin,
// generateRefreshToken,
// refreshToken
