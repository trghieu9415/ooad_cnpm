const { Comment, MemberVote, MemberFlag } = require('@models/_index')
const createResData = require('@utils/resMaker')

const getAllComments = async () => {
  try {
    const comments = await Comment.findAll()
    const commentsWithFlags = await Promise.all(
      comments.map(async (comment) => {
        comment.dataValues.flagCount = await getFlagById(comment.dataValues.id)
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
    if (!comment) {
      return createResData(404, { message: 'Comment not found' })
    }

    const commentText = comment.dataValues.comment_text.startsWith('$')
      ? '[HIDDEN COMMENT]'
      : comment.dataValues.comment_text

    return createResData(200, { ...comment.dataValues, comment_text: commentText })
  } catch (error) {
    return createResData(500, error)
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
    await comment.update({ comment_text })
    return createResData(200, { ...comment.dataValues, comment_text })
  } catch (error) {
    return createResData(500, error)
  }
}

const deleteComment = async (id) => {
  try {
    const deleted = await Comment.destroy({ where: { id } })
    if (deleted) {
      return createResData(204, { message: 'Comment deleted' })
    } else {
      return createResData(404, { message: 'Comment not found' })
    }
  } catch (error) {
    return createResData(500, error)
  }
}

const hideComment = async (id) => {
  try {
    const comment = await Comment.findByPk(id)
    if (!comment) {
      return createResData(404, { message: 'Comment not found' })
    }
    await comment.update({ comment_text: `$${comment.dataValues.comment_text}` })
    return createResData(200, { ...comment.dataValues, comment_text: 'Comment is hidden' })
  } catch (error) {
    return createResData(500, error)
  }
}

const showComment = async (id) => {
  try {
    const comment = await Comment.findByPk(id)
    if (!comment) {
      return createResData(404, { message: 'Comment not found' })
    }
    if (comment.dataValues.comment_text.startsWith('$')) {
      await comment.update({ comment_text: comment.dataValues.comment_text.slice(1) })
    }
    return createResData(200, { ...comment.dataValues, comment_text: comment.dataValues.comment_text.slice(1) })
  } catch (error) {
    return createResData(500, error)
  }
}

const getFlagById = async (id) => {
  try {
    return await MemberFlag.count({ where: { comment_id: id } })
  } catch (error) {
    return 0 // Trả về 0 nếu có lỗi để không làm crash luồng chính
  }
}

const getCommentByQuestion = async (question_id) => {
  try {
    const comments = await Comment.findAll({ where: { question_id } })
    const commentsWithFlags = await Promise.all(
      comments.map(async (comment) => {
        comment.dataValues.comment_text = comment.dataValues.comment_text.startsWith('$')
          ? '[HIDDEN COMMENT]'
          : comment.dataValues.comment_text

        comment.dataValues.flagCount = await getFlagById(comment.dataValues.id)

        return comment
      })
    )
    return createResData(200, commentsWithFlags)
  } catch (error) {
    return createResData(500, error)
  }
}

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  hideComment,
  showComment,
  getCommentByQuestion
}
