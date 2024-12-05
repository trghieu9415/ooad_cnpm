const express = require('express')
const { Comment } = require('@controllers/_index')
const authenticateAccount = require('@middlewares/authMiddleware')

const router = express.Router()

router.get('/all', Comment.getComments)
router.get('/:id', Comment.getCommentById)
router.get('/question/:question_id', Comment.getCommentByQuestion)
router.post('/question/:question_id/create', authenticateAccount, Comment.createComment)

module.exports = router
