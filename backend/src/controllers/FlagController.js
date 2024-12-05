const MemberFlag = require('../models/MemberFlag')

const getAllMemberFlagsController = async (req, res) => {
  try {
    const flags = await MemberFlag.findAll()
    res.status(200).json(flags)
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu từ MemberFlag:', error)
    res.status(500).json({ error: 'Không thể lấy dữ liệu từ bảng MemberFlag' })
  }
}

module.exports = { getAllMemberFlagsController }
