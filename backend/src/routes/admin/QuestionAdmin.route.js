const express = require('express')
const { QuestionAdmin } = require('@root/controllers/admin/_index')

const router = express.Router()

router.get('/all', QuestionAdmin.getAllQuestions)
router.put('/status/:id', QuestionAdmin.handleStatusChange)

module.exports = router
