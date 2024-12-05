const express = require('express')
const { FlagAdmin } = require('@root/controllers/admin/_index')

const router = express.Router()

router.get('/get-all', FlagAdmin.getAllMemberFlags)

module.exports = router
