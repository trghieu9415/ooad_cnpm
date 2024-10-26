const express = require('express')
const { AccountAdmin } = require('@root/controllers/admin/_index')

const router = express.Router()

router.post('/login', AccountAdmin.login)
router.post('/create', AccountAdmin.createAdminAccount)

module.exports = router
