const { Comment } = require('@entities/_index')

const getComments = async (req, res) => {
  try {
    const result = await Comment.getAllComments()
    res.status(result.status).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getCommentById = async (req, res) => {
  try {
    const comment_id = req.params.id
    const result = await Comment.getCommentById(comment_id)
    res.status(result.status).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getCommentByQuestion = async (req, res) => {
  try {
    const question_id = req.params.question_id
    const result = await Comment.getCommentByQuestion(question_id)
    res.status(result.status).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const createComment = async (req, res) => {
  const member_id = req.member_id
  const { question_id } = req.params
  const { content_text } = req.body

  try {
    const result = await Comment.createComment(question_id, member_id, content_text)
    res.status(result.status).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const hideComment = async (req, res) => {
  try {
    const comment_id = req.params.id
    const result = await Comment.hideComment(comment_id)
    res.status(result.status).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const showComment = async (req, res) => {
  try {
    const comment_id = req.params.id
    const result = await Comment.showComment(comment_id)
    res.status(result.status).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  getComments,
  getCommentById,
  getCommentByQuestion,
  createComment,
  hideComment,
  showComment
}
