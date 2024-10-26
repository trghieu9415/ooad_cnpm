const express = require('express')
const router = express.Router()

const AccountRoutes = require('./AccountAdmin.route')
const MemberRoutes = require('./MemberAdmin.route')
const QuestionRoutes = require('./QuestionAdmin.route')
// const TagRoutes = require('./TagAdmin.route')
const CommentRoutes = require('./CommentAdmin.route')

router.use('/account', AccountRoutes)
router.use('/member', MemberRoutes)
router.use('/question', QuestionRoutes)
// router.use('/tag', TagRoutes)
router.use('/comment', CommentRoutes)

module.exports = router
