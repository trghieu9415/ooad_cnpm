const { Question } = require('@entities/_index')

const getAllQuestions = async (req, res) => {
  try {
    const result = await Question.getAllQuestions()
    res.status(result.status).json(result.data)
  } catch (error) {
    res.status(500).json(error)
  }
}

const handleStatusChange = async (req, res) => {
  const { status, closing_remark } = req.body // Assuming you're sending status and question_id in the request body
  const { id } = req.params

  try {
    const result = await Question.handleStatus(id, status, closing_remark)
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
  handleStatusChange,
  getQuestionById
}
