const express = require('express')
const { AccountAdmin } = require('@controllers/admin/index')
const authenticateAccount = require('@middlewares/authMiddleware')

const router = express.Router()

router.post('/login', AccountAdmin.login)

module.exports = router
