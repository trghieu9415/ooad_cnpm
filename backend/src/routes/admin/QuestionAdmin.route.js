const express = require('express')
const { QuestionAdmin } = require('@root/controllers/admin/_index')

const router = express.Router()

router.get('/', QuestionAdmin.getAllQuestions)
router.get('/:id', QuestionAdmin.getQuestionById)
router.put('/:id', QuestionAdmin.handleQuestionStatus)
router.get('/tag/:tag_id', QuestionAdmin.getQuestionsByTag)
module.exports = router
