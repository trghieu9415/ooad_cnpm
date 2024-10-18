const SystemAdministratorAccount = require('../../models/admin/SystemAdministratorAccount')
const { generateTokenAdmin, refreshToken } = require('@root/utils/tokenGenerator')

const login = async (req, res) => {
  const { username, password } = req.body

  try {
    const adminAccount = await SystemAdministratorAccount.findOne({
      where: { username }
    })

    if (!adminAccount) {
      return res.status(401).json({
        message: 'Tài khoản không tồn tại'
      })
    }

    if (password !== adminAccount.password) {
      return res.status(401).json({
        message: 'Mật khẩu không đúng'
      })
    }

    const token = generateTokenAdmin(adminAccount.id, adminAccount.username)
    return res.json({
      message: 'Đăng nhập thành công',
      data: {
        id: adminAccount.id,
        username: adminAccount.username,
        token: `Bearer ${token}`
      }
    })
  } catch (error) {
    console.error('Error in loginAdmin:', error)
    return res.status(500).json({
      message: 'Có lỗi xảy ra trong quá trình đăng nhập'
    })
  }
}

// const handleRefreshToken = async (req, res) => {
//   const { refreshToken: token } = req.body

//   try {
//     const { accessToken } = refreshToken(token)
//     return res.json({
//       message: 'Access token được tạo mới thành công',
//       accessToken
//     })
//   } catch (error) {
//     return res.status(403).json({
//       message: 'Refresh token không hợp lệ hoặc đã hết hạn'
//     })
//   }
// }
module.exports = { login }
