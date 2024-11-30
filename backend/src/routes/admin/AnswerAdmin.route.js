const express = require('express')
const { AnswerAdmin } = require('@controllers/admin/_index')
// const authenticateAccount = require('@middlewares/authMiddleware')

const router = express.Router()

router.get('/:id', AnswerAdmin.getAnswerById)
router.get('/question/:question_id', AnswerAdmin.getAnswerByQuestion)

module.exports = router
