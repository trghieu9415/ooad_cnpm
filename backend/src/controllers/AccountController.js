const { Account, Member } = require('@entities/_index')
const { isUsernameExisted } = require('@root/entities/eAccount')
const { isEmailExisted, isPhoneExisted } = require('@root/entities/eMember')
const createResData = require('@root/utils/resMaker')
const generateToken = require('@utils/tokenGenerator')

const login = async (req, res) => {
  const { username, password } = req.body
  try {
    const result = await Account.getHandledAccountByInfo(username, password)
    if (result.success) {
      const account_id = result.data.id
      const member_id = result.data.Member.id
      const token = generateToken(account_id, member_id)
      res.setHeader('Authorization', `Bearer ${token}`)
    }
    res.status(result.status).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const register = async (req, res) => {
  const { username, password, name, email, phone, biography } = req.body
  try {
    if (await isUsernameExisted(username)) {
      return res.status(409).json({ username: 'Tên đăng nhập đã tồn tại' })
    }
    if (await isEmailExisted(email)) {
      return res.status(409).json({ email: 'Email đã tồn tại' })
      // return createResData(409, { message: 'Email already exists' })
    } else if (await isPhoneExisted(phone)) {
      return res.status(409).json({ phone: 'Số điện thoại đã tồn tại' })
      // return createResData(409, { message: 'Phone already exists' })
    }
    const accountResult = await Account.createAccount(username, password)

    if (!accountResult.success) {
      return res.status(accountResult.status).json(accountResult.data)
    }
    const memberResult = await Member.createMember(accountResult.data.id, name, email, phone, biography)
    if (!memberResult.success) {
      return res.status(memberResult.status).json(memberResult.data)
    }
    const data = {
      accout_info: accountResult.data,
      member_info: memberResult.data
    }
    const token = generateToken(accountResult.data.id, memberResult.data.id)
    res.setHeader('Authorization', `Bearer ${token}`)
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const logout = async (req, res) => {}

const changePassword = async (req, res) => {
  const { current_password, new_password } = req.body
  const account_id = req.account_id
  try {
    const result = await Account.changePassword(account_id, current_password, new_password)
    res.status(result.status).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const forgotPassword = async (req, res) => {}

const changeState = async (req, res) => {}

const verifyEmail = async (req, res) => {}

module.exports = {
  login,
  register,
  logout,
  changePassword,
  forgotPassword,
  changeState,
  verifyEmail
}
