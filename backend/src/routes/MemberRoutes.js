const express = require('express');
const { Member } = require("@controllers/_index")
const authenticateAccount = require("@middlewares/authMiddleware")

const router = express.Router();

const multer = require('multer');
const upload = multer();

const setTypeisQuestion = (req, res, next) => {
  req.related_type = 'Question'
  next()
}
const setTypeisComment = (req, res, next) => {
  req.related_type = 'Comment'
  next()
}

const setTypeisAnswer = (req, res, next) => {
  req.related_type = 'Answer'
  next()
}

router.get('/self', authenticateAccount, Member.getCurrentMember)
router.get('/all', Member.getAllMember)
router.get('/:id', Member.getMemberById)
router.put('/update', upload.none(), authenticateAccount, Member.updateMember)
router.post('/save/:question_id', authenticateAccount, Member.saveQuestion)
router.post('/flag/question/:question_id', authenticateAccount, upload.none(), setTypeisQuestion, Member.flag)
router.post('/flag/comment/:comment_id', authenticateAccount, upload.none(), setTypeisComment, Member.flag)
router.post('/flag/answer/:answer_id', authenticateAccount, upload.none(), setTypeisAnswer, Member.flag)
router.post('/vote/question/:question_id', authenticateAccount, upload.none(), setTypeisAnswer, Member.vote)
router.post('/vote/answer/:answer_id', authenticateAccount, upload.none(), setTypeisAnswer, Member.vote)


module.exports = router