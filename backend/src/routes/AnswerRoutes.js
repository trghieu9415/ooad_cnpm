const express = require('express')
const { Answer } = require('@controllers/_index')
const authenticateAccount = require('@middlewares/authMiddleware')

const router = express.Router()

router.get('/:id', Answer.getAnswerById)
router.post('/question/:question_id/create', authenticateAccount, Answer.createAnswer)
router.get('/question/:question_id', Answer.getAnswerByQuestion)
router.put('/hide/:id', Answer.hideAnswer)
router.put('/show/:id', Answer.showAnswer)
router.put('/:id/correct', authenticateAccount, Answer.setCorrectAnswer)

router.get('/:questionId/accepted-answers', Answer.getAcceptedAnswersByQuestionIdController) // Định nghĩa route với tham số questionId
router.get('/vote-result/question_id=:question_id', authenticateAccount, Answer.getVoteResult)
module.exports = router
