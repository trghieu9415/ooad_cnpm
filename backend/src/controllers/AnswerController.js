const { Answer } = require('@entities/_index')

const getAnswerById = async (req, res) => {
  const id = req.params.id
  const result = await Answer.getAnswerById(id)
  res.status(result.status).json(result.data)
}

const getAnswerByQuestion = async (req, res) => {
  const question_id = req.params.question_id
  const result = await Answer.getAnswerByQuestion(question_id)
  res.status(result.status).json(result.data)
}

const createAnswer = async (req, res) => {
  const member_id = req.member_id
  const question_id = req.params.question_id
  const { answer_text } = req.body
  const result = await Answer.createAnswer(question_id, member_id, answer_text)
  res.status(result.status).json(result.data)
}

const setCorrectAnswer = async (req, res) => {
  const id = req.params.id
  const member_id = req.member_id
  const result = await Answer.setCorrectAnswer(id, member_id)
  res.status(result.status).json(result.data)
}

module.exports = {
  getAnswerById,
  getAnswerByQuestion,
  createAnswer,
  setCorrectAnswer
}
