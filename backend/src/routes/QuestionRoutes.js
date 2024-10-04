const express = require('express')
const { Question, Member } = require('@controllers/_index')
const authenticateAccount = require('@middlewares/authMiddleware')

const router = express.Router()

const multer = require('multer')
const upload = multer()

router.get('/', Question.getQuestions)
router.get('/:id', Question.getQuestionById)
router.get('/member/:member_id', Question.getQuestionsByMember)
router.get('/tag/:tag_id', Question.getQuestionsByTag)
router.post('/create', authenticateAccount, upload.none(), Question.createQuestion)

module.exports = router
