const SystemAdministratorAccount = require('../../models/admin/SystemAdministratorAccount')
const { generateTokenAdmin } = require('@root/utils/tokenGenerator')

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

const createAdminAccount = async (req, res) => {
  const { username, password } = req.body

  try {
    const existingAdmin = await SystemAdministratorAccount.findOne({
      where: { username }
    })

    if (existingAdmin) {
      return res.status(400).json({
        message: 'Tên tài khoản đã tồn tại'
      })
    }

    const newAdminAccount = await SystemAdministratorAccount.create({
      username,
      password // Không hash vì đã quy định admin password không cần hash
    })

    const token = generateTokenAdmin(newAdminAccount.id, newAdminAccount.username)

    return res.status(201).json({
      message: 'Tài khoản admin được tạo thành công',
      data: {
        id: newAdminAccount.id,
        username: newAdminAccount.username,
        token: `Bearer ${token}`
      }
    })
  } catch (error) {
    console.error('Error in createAdminAccount:', error)
    return res.status(500).json({
      message: 'Có lỗi xảy ra trong quá trình tạo tài khoản'
    })
  }
}

module.exports = { login, createAdminAccount }
