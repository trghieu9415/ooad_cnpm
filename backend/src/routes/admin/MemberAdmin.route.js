const express = require('express')
const { MemberAdmin } = require('@root/controllers/admin/_index')

const router = express.Router()

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
const memberMiddleware = (req, res, next) => {
  req.member_id = req.headers['memberid']
  next()
}

router.get('/', MemberAdmin.getAllMember)
router.get('/:id', MemberAdmin.getMemberById)
router.put('/block_account/:id', MemberAdmin.toggleAccountStateMember)
router.put('/update/:id', MemberAdmin.updateMember)
router.post('/flag/question/:id', setTypeisQuestion, memberMiddleware, MemberAdmin.flag)
router.post('/flag/comment/:id', setTypeisComment, memberMiddleware, MemberAdmin.flag)
router.post('/flag/answer/:id', setTypeisAnswer, memberMiddleware, MemberAdmin.flag)
module.exports = router
