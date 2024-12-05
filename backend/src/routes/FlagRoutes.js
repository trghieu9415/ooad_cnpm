const express = require('express')
const { getAllMemberFlagsController } = require('../controllers/FlagController')

const router = express.Router()

router.get('/member-flags', getAllMemberFlagsController)

module.exports = router
