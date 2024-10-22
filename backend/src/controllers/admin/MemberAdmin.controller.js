const { Account, Member } = require('../../entities/_index')

const getAllMember = async (req, res) => {
  try {
    const memberResult = await Member.getAllMembers()
    res.status(memberResult.status).json(memberResult.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateMember = async (req, res) => {
  try {
    const member_id = req.params.id
    console.log(member_id)

    const { name, email, phone, biography } = req.body
    const memberResult = await Member.updateMember(member_id, name, email, phone, biography)
    res.status(memberResult.status).json(memberResult.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const toggleAccountStateMember = async (req, res) => {
  const accountId = req.params.id // Lấy ID tài khoản từ params\
  console.log(accountId)

  try {
    const response = await Account.changeState(accountId)
    return res.status(response.status).json(response.data)
  } catch (error) {
    console.error('Error in toggleAccountState:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const updateInfoMember = () => {}
module.exports = {
  toggleAccountStateMember,
  getAllMember,
  updateMember
}
