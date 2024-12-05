const { Question, Bounty } = require('@entities/_index')
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
    const member_id = req.member_id
    const { title, question_text, tags } = req.body
    const result = await Question.createQuestion(member_id, title, question_text, tags)
    res.status(result.status).json(result.data)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getBountyById = async (req, res) => {
  try {
    const question_id = req.params.id
    const result = await Bounty.getCurrentBountyByQuestionId(question_id)
    res.status(result.status).json(result.data)
  } catch (error) {
    res.status(500).json(error)
  }
}

const createBounty = async (req, res) => {
  try {
    const question_id = req.params.id
    const reputation = req.body.reputation
    const result = await Bounty.createQuestionBounty(question_id, reputation)
    res.status(result.status).json(result.data)
  } catch (error) {
    res.status(500).json(error)
  }
}

const awardBounty = async (req, res) => {
  try {
    const question_id = req.params.id
    const member_id = req.body.member_id
    const result = await Bounty.awardBounty(question_id, member_id)
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
  getQuestionsByTag,
  createBounty,
  awardBounty,
  getBountyById
}
