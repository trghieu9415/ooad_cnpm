const express = require('express')
const router = express.Router()

const AccountRoutes = require('./AccountAdmin.route')
const MemberRoutes = require('./MemberAdmin.route')

router.use('/account', AccountRoutes)
router.use('/member', MemberRoutes)

module.exports = router
