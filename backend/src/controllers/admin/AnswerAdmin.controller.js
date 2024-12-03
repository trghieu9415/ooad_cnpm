const { Answer } = require('@entities/_index')

const getAllAnswer = async (req, res) => {
  try {
    const answerResult = await Answer.getAllAnswers()
    res.status(answerResult.status).json(answerResult.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

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

module.exports = {
  getAnswerById,
  getAnswerByQuestion,
  getAllAnswer
}
