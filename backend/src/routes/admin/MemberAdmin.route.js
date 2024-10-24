const express = require('express')
const { MemberAdmin } = require('@root/controllers/admin/_index')

const router = express.Router()

router.get('/all', MemberAdmin.getAllMember)
router.put('/block_account/:id', MemberAdmin.toggleAccountStateMember)
router.put('/update/:id', MemberAdmin.updateMember)

module.exports = router
