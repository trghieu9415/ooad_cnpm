const { MemberFlag, Comment, Answer, Question } = require('@models/_index')

const getAllMemberFlags = async (req, res) => {
  try {
    // Lấy tất cả dữ liệu và liên kết với các bảng liên quan
    const memberFlags = await MemberFlag.findAll({
      include: [
        {
          model: Comment,
          as: 'comment'
        },
        {
          model: Answer,
          as: 'answer'
        },
        {
          model: Question,
          as: 'question'
        }
      ]
    })

    // Lọc dữ liệu để chỉ trả về comment, answer, question nếu chúng không phải là null
    const filteredMemberFlags = memberFlags.map((flag) => {
      const filteredFlag = flag.toJSON() // Chuyển đối tượng Sequelize thành JSON

      // Lọc các thuộc tính null
      if (!filteredFlag.comment) {
        delete filteredFlag.comment
      }

      if (!filteredFlag.answer) {
        delete filteredFlag.answer
      }

      if (!filteredFlag.question) {
        delete filteredFlag.question
      }

      return filteredFlag
    })

    res.status(200).json({
      success: true,
      data: filteredMemberFlags
    })
  } catch (error) {
    console.error('Error fetching member flags:', error)
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy dữ liệu member flags',
      error: error.message
    })
  }
}

module.exports = {
  getAllMemberFlags
}
