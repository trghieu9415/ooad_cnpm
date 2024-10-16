const { Account, Member } = require('@models/_index')
const createResData = require('@utils/resMaker')
const { hashPassword, comparePassword } = require('@utils/hashUtil')

const getAllAccounts = async () => {
  try {
    const accounts = await Account.findAll()
    return createResData(200, accounts)
  } catch (error) {
    return createResData(500, error)
  }
}

const getAccountById = async (id) => {
  try {
    const account = await Account.findByPk(id)
    if (account) {
      return createResData(200, account)
    } else {
      return createResData(404, { message: 'Account not found' })
    }
  } catch (error) {
    return createResData(500, error)
  }
}

const createAccount = async (username, password) => {
  try {
    // if (await isUsernameExisted(username)) {
    //   return createResData(409, { message: 'Username already exists' })
    // }
    const hashedPassword = await hashPassword(password)
    const account = await Account.create({
      username,
      password: hashedPassword
    })
    return createResData(201, account)
  } catch (error) {
    return createResData(500, error)
  }
}

const changePassword = async (id, currentPassword, newPassword) => {
  try {
    const account = await Account.findByPk(id)
    if (!account) {
      return createResData(404, { message: 'Account not found' })
    }
    const isPasswordCorrect = await comparePassword(currentPassword, account.dataValues.password)
    if (!isPasswordCorrect) {
      return createResData(401, { message: 'Current password is incorrect' })
    }
    const hashedPassword = await hashPassword(newPassword)
    await account.update({ password: hashedPassword })
    return createResData(200, { message: 'Password changed successfully' })
  } catch (error) {
    return createResData(500, error)
  }
}

const changeState = async (id, state) => {
  try {
    const account = await Account.findByPk(id)
    if (!account) {
      return createResData(404, { message: 'Account not found' })
    }
    await account.update({ state })
    return createResData(200, { message: 'State changed successfully' })
  } catch (error) {
    return createResData(500, error)
  }
}

// CHỈ SỬ DỤNG HÀM NÀY KHI CHẮC CHẮN CÓ THỂ XÓA MÀ KHÔNG ẢNH HƯỞNG ĐẾN BẢNG KHÁC!!!
const deleteAccount = async (id) => {
  try {
    const deleted = await Account.destroy({ where: { id: id } })
    if (deleted) {
      return createResData(204, { message: 'Account deleted' })
    } else {
      return createResData(404, { message: 'Account not found' })
    }
  } catch (error) {
    return createResData(500, error)
  }
}

const getHandledAccountByInfo = async (username, password) => {
  try {
    const account = await Account.findOne({
      where: { username: username },
      include: [
        {
          model: Member,
          attributes: ['id']
        }
      ]
    })
    if (!account) {
      return createResData(401, { username: 'Tên đăng nhập không chính xác!' })
    } else if (await comparePassword(password, account.dataValues.password)) {
      return handleAccountStatus(account)
    } else {
      return createResData(401, { password: 'Mật khẩu không chính xác!' })
    }
  } catch (error) {
    return createResData(500, error)
  }
}

const handleAccountStatus = (account) => {
  if (account) {
    if (['Active', 'Blocked'].includes(account.status)) {
      return createResData(200, account)
    } else {
      return createResData(403, { message: `Account has been ${account.status}` })
    }
  } else {
    return createResData(404, { message: 'Account not found' })
  }
}

const isUsernameExisted = async (username) => {
  try {
    const counted = await Account.count({
      where: { username: username }
    })
    return counted === 0 ? false : true
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllAccounts,
  getAccountById,
  getHandledAccountByInfo,
  createAccount,
  changePassword,
  changeState,
  deleteAccount,
  isUsernameExisted
}
