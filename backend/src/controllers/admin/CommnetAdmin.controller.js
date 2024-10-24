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
module.exports = {
  getComments,
  getCommentById,
  getCommentByQuestion
}
