const express = require('express')
const { Account } = require('@controllers/_index')
const authenticateAccount = require('@middlewares/authMiddleware')

const router = express.Router()

router.post('/login', Account.login)
router.post('/register', Account.register)
router.get('/logout', Account.logout)
router.put('/changepassword', authenticateAccount, Account.changePassword)
router.post('/forgotpassword', Account.forgotPassword)
router.post('/verify-email', authenticateAccount, Account.verifyEmail)
module.exports = router
