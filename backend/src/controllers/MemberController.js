const { Member } = require('@entities/_index')

const getCurrentMember = async (req, res) => {
  try {
    const member_id = req.member_id
    const memberResult = await Member.getMemberById(member_id)
    res.status(memberResult.status).json(memberResult.data)
  } catch (err) {
    res.status(500).json(err)
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
    const member_id = req.member_id
    const { name, email, phone, biography } = req.body
    const memberResult = await Member.updateMember(member_id, name, email, phone, biography)
    res.status(memberResult.status).json(memberResult.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const vote = async (req, res) => {
  try {
    const member_id = req.member_id
    const related_type = req.related_type
    const related_id = req.params.id
    const { vote_type } = req.body
    const voteResult = await Member.vote(member_id, related_id, related_type, vote_type)
    res.status(voteResult.status).json(voteResult.data)
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

const saveQuestion = async (req, res) => {
  try {
    const member_id = req.member_id
    const question_id = req.params.question_id

    const result = await Member.saveQuestion(member_id, question_id, true)
    res.status(result.status).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getSavedQuestion = async (req, res) => {
  try {
    const member_id = req.member_id
    const result = await Member.getSavedQuestion(member_id)
    res.status(result.status).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const viewQuestion = async (req, res) => {
  try {
    const member_id = req.member_id
    const { question_id } = req.body
    const result = await Member.viewQuestion(member_id, question_id)
    if (!result.success) {
      res.status(result.status).json(result.data)
    } else {
      res.status(200)
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateSavedStatusController = async (req, res) => {
  try {
    const { memberViewId } = req.params // Lấy memberViewId từ URL parameter

    const updatedRows = await Member.updateSavedStatus(memberViewId)

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy bản ghi.' })
    }

    return res.status(200).json({ message: 'Cập nhật thành công.' })
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server.', error: error.message })
  }
}

module.exports = {
  getCurrentMember,
  getMemberById,
  getAllMember,
  vote,
  flag,
  updateMember,
  viewQuestion,
  saveQuestion,
  getSavedQuestion,
  updateSavedStatusController
}
