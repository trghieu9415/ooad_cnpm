const { Question } = require('@entities/_index')
const logger = require('@root/utils/logger')

const getQuestionById = async (req, res) => {
  try {
    const id = req.params.id

    // console.error('ID:', id)
    const result = await Question.getQuestionById(id)
    res.status(result.status).json(result.data)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getQuestions = async (req, res) => {
  try {
    const result = await Question.getAllQuestions()
    res.status(result.status).json(result.data)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getQuestionsByMember = async (req, res) => {
  try {
    const member_id = req.params.member_id
    const result = await Question.getQuestionByMember(member_id)
    res.status(result.status).json(result.data)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getQuestionsByTag = async (req, res) => {
  try {
    const tag_id = req.params.tag_id
    const result = await Question.getQuestionByTag(tag_id)
    res.status(result.status).json(result.data)
  } catch (error) {
    res.status(500).json(error)
  }
}

const createQuestion = async (req, res) => {
  try {
    const member_id = req.member
    const { title, question_text, tags } = req.body
    const result = await Question.createQuestion(member_id, title, question_text, tags)
    res.status(result.status).json(result.data)
  } catch (error) {
    res.status(500).json(error)
  }
}

const addQuestionEdit = async (req, res) => {}

const closeQuestion = async (req, res) => {}

module.exports = {
  getQuestionById,
  getQuestions,
  createQuestion,
  addQuestionEdit,
  closeQuestion,
  getQuestionsByMember,
  getQuestionsByTag
}
