const express = require('express')
const { CommentAdmin } = require('@root/controllers/admin/_index')
const { route } = require('../AccountRoutes')

const router = express.Router()

router.get('/', CommentAdmin.getComments)
router.get('/:id', CommentAdmin.getCommentById)
router.get('/by_question/:question_id', CommentAdmin.getCommentByQuestion)

module.exports = router
