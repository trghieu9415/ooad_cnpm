const express = require('express')
const { Member } = require('@controllers/_index')
const authenticateAccount = require('@middlewares/authMiddleware')

const router = express.Router()

const setType = (type) => {
  return (req, res, next) => {
    if (['Question', 'Comment', 'Answer'].includes(type)) {
      req.related_type = type
      next()
    } else {
      res.status(500).json({ error: 'Error from server: Invalid Type' })
    }
  }
}

router.get('/self', authenticateAccount, Member.getCurrentMember)
router.get('/all', Member.getAllMember)
router.put('/update', authenticateAccount, Member.updateMember)
router.post('/save/:question_id', authenticateAccount, Member.saveQuestion)
router.get('/saved', authenticateAccount, Member.getSavedQuestion)
router.post('/flag/question/:id', authenticateAccount, setType('Question'), Member.flag)
router.post('/flag/comment/:id', authenticateAccount, setType('Comment'), Member.flag)
router.post('/flag/answer/:id', authenticateAccount, setType('Answer'), Member.flag)
router.post('/vote/question/:id', authenticateAccount, setType('Question'), Member.vote)
router.post('/vote/answer/:id', authenticateAccount, setType('Answer'), Member.vote)
router.get('/:id', Member.getMemberById)

router.put('/un-save/:memberViewId', Member.updateSavedStatusController)

module.exports = router
