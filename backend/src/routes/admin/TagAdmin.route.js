const express = require('express')
const { TagAdmin } = require('@root/controllers/admin/_index')

const router = express.Router()

router.get('/', TagAdmin.getTags)
router.post('/create', TagAdmin.createTag)
router.put('/update/:id', TagAdmin.updateTag)
router.delete('/delete/:id', TagAdmin.deleteTagController)

module.exports = router
