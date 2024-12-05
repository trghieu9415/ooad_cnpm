const { Question } = require('@entities/_index')

const getAllQuestions = async (req, res) => {
  try {
    const result = await Question.getAllQuestions()
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

module.exports = {
  getAllQuestions,
  handleQuestionStatus,
  getQuestionById
}
