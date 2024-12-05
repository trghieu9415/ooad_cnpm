const MemberVote = require('../models/MemberVote')

const getAllMemberVotesController = async (req, res) => {
  try {
    const flags = await MemberVote.findAll()
    res.status(200).json(flags)
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu từ MemberVote:', error)
    res.status(500).json({ error: 'Không thể lấy dữ liệu từ bảng MemberVote' })
  }
}

module.exports = { getAllMemberVotesController }
