const express = require('express')
const { Comment } = require('@controllers/_index')
const authenticateAccount = require('@middlewares/authMiddleware')

const router = express.Router()


router.get('/:id', Comment.getCommentById)
router.get('/questions/:question_id', Comment.getCommentByQuestion)
router.post('/questions/:question_id/create', authenticateAccount, Comment.createComment)

module.exports = router
