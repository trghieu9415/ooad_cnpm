const express = require('express')
const { MemberAdmin } = require('@root/controllers/admin/_index')

const router = express.Router()

router.get('/', MemberAdmin.getAllMember)
router.get('/:id', MemberAdmin.getMemberById)
router.put('/block_account/:id', MemberAdmin.toggleAccountStateMember)
router.put('/update/:id', MemberAdmin.updateMember)

module.exports = router
