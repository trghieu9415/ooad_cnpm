const express = require('express')
const { Question, Member } = require('@controllers/_index')
const authenticateAccount = require('@middlewares/authMiddleware')

const router = express.Router()

router.get('/', Question.getQuestions)
router.get('/:id', Question.getQuestionById)
router.get('/member/:member_id', Question.getQuestionsByMember)
router.get('/tag/:tag_id', Question.getQuestionsByTag)
router.post('/create', authenticateAccount, Question.createQuestion)

router.get('/:id/bounty', authenticateAccount, Question.getBountyById)
router.post('/:id/bounty', authenticateAccount, Question.createBounty)
router.post('/:id/award', authenticateAccount, Question.awardBounty)

router.put('/:id/update-status', Question.handleQuestionStatus)

module.exports = router
