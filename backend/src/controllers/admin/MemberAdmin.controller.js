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
    // console.log(member_id)

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

const getMemberById = async (req, res) => {
  try {
    const member_id = req.params.id
    const memberResult = await Member.getMemberById(member_id)
    res.status(memberResult.status).json(memberResult.data)
  } catch (err) {
    res.status(500).json(err)
  }
}
const flag = async (req, res) => {
  try {
    const member_id = req.member_id
    const related_type = req.related_type
    const related_id = req.params.id
    const { flag_type } = req.body
    const flagResult = await Member.flag(member_id, related_id, related_type, flag_type)
    res.status(flagResult.status).json(flagResult.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  toggleAccountStateMember,
  getAllMember,
  updateMember,
  getMemberById,
  flag
}
