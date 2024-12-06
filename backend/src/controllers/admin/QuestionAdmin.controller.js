const { Question } = require('@entities/_index')

const getAllQuestions = async (req, res) => {
  try {
    const result = await Question.getAllQuestionsAdmin()
    res.status(result.status).json(result.data)
  } catch (error) {
    res.status(500).json(error)
  }
}

const handleQuestionStatus = async (req, res) => {
  try {
    const question_id = req.params.id
    const status = req.body.status
    const result = await Question.handleStatus(question_id, status)
    res.status(result.status).json(result.data)
  } catch (error) {
    res.status(500).json(error)
  }
}
const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await Question.getQuestionById(id)
    res.status(result.status).json(result.data)
  } catch (error) {
    res.status(500).json(error)
  }
}
const getQuestionsByTag = async (req, res) => {
  try {
    const tag_id = req.params.tag_id
    const result = await Question.getQuestionsByTag(tag_id)
    res.status(result.status).json(result.data)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  getAllQuestions,
  handleQuestionStatus,
  getQuestionById,
  getQuestionsByTag
}
