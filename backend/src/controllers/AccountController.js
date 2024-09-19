const { Account, Member } = require("@entities/_index")
const generateToken = require("@utils/tokenGenerator")

const login = async (req, res) => {
	const { username, password } = req.body
	try {
		const result = await Account.getHandledAccountByInfo(username, password);
		if (result.success) {
			const account_id  = result.data.account
			const member_id  = result.data.Member.id
			const token = generateToken(member_id, account_id)
			res.setHeader('Authorization', `Bearer ${token}`);
		}
		res.status(result.status).json(result.data);
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

const register = async (req, res) => {
	const { username, password, name, email, phone, biography } = req.body
		try {
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
			const token = generateToken(memberResult.data.id, accountResult.data.id)
			res.setHeader('Authorization', `Bearer ${token}`);
			res.status(200).json(data);
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
}

const logout = async (req, res) => {}

const changePassword = async (req, res) => {
	const { currentPassword, newPassword } = req.body
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