const express = require('express')
const router = express.Router()

const AccountRoutes = require('./AccountAdmin.route')

router.use('/account', AccountRoutes)

module.exports = router
