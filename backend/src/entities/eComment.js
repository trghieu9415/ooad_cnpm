const { Comment, MemberVote, MemberFlag } = require('@models/_index')
const createResData = require('@utils/resMaker')

const getAllComments = async () => {
  try {
    const comments = await Comment.findAll()
    const commentsWithFlags = await Promise.all(
      comments.map(async (comment) => {
        comment.dataValues.flagCount = getFlagById(comment.dataValues.id)
        return comment
      })
    )
    return createResData(200, commentsWithFlags)
  } catch (error) {
    return createResData(500, error)
  }
}

const getCommentById = async (id) => {
  try {
    const comment = await Comment.findByPk(id)
    if (comment) {
      comment.dataValues.flagCount = await getFlagById(comment.dataValues.id)
      return createResData(200, comment)
    } else {
      return createResData(404, { message: 'Comment not found' })
    }
  } catch (error) {
    throw error
  }
}

const createComment = async (question_id, member_id, comment_text) => {
  try {
    const newComment = await Comment.create({
      question_id,
      member_id,
      comment_text
    })
    return createResData(201, (await getCommentById(newComment.dataValues.id)).data)
  } catch (error) {
    return createResData(500, error)
  }
}

const updateComment = async (id, comment_text) => {
  try {
    const comment = await Comment.findByPk(id)
    if (!comment) {
      return createResData(404, { message: 'Comment not found' })
    }
    await comment.update({
      comment_text
    })
    return createResData(201, (await getCommentById(id)).data)
  } catch (error) {
    return createResData(500, error)
  }
}

// CHỈ SỬ DỤNG HÀM NÀY KHI CHẮC CHẮN CÓ THỂ XÓA MÀ KHÔNG ẢNH HƯỞNG ĐẾN BẢNG KHÁC!!!
const deleteComment = async (id) => {
  try {
    const deleted = await Comment.destroy({ where: { id: id } })
    if (deleted) {
      return createResData(204, { message: 'Comment deleted' })
    } else {
      return createResData(404, { message: 'Comment not found' })
    }
  } catch (error) {
    return createResData(500, error)
  }
}

const getFlagById = async (id) => {
  try {
    const flagCount = await MemberFlag.count({
      where: { comment_id: id }
    })
    return flagCount
  } catch (error) {
    throw error
  }
}

const getCommentByQuestion = async (question_id) => {
  try {
    const comments = await Comment.findAll({ where: { question_id: question_id } })
    const commentsWithFlags = await Promise.all(
      comments.map(async (comment) => {
        comment.dataValues.flagCount = await getFlagById(comment.dataValues.id)
        return comment
      })
    )
    return createResData(200, commentsWithFlags)
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  getCommentByQuestion
}
