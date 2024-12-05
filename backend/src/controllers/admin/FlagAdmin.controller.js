const { MemberFlag, Comment, Answer, Question, Member } = require('@models/_index')

const getAllMemberFlags = async (req, res) => {
  try {
    // Lấy tất cả dữ liệu và liên kết với các bảng liên quan
    const memberFlags = await MemberFlag.findAll({
      include: [
        {
          model: Comment,
          as: 'comment',
          include: {
            model: Member,
            as: 'member' // Giả sử bảng Comment có liên kết với Member qua `member_id`
          }
        },
        {
          model: Answer,
          as: 'answer',
          include: {
            model: Member,
            as: 'member' // Liên kết tương tự với Answer
          }
        },
        {
          model: Question,
          as: 'question',
          include: {
            model: Member,
            as: 'member' // Liên kết tương tự với Question
          }
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
