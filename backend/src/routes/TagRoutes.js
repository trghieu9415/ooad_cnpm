const express = require('express')
const { Tag } = require('@controllers/_index')
const authenticateAccount = require('@middlewares/authMiddleware')

const router = express.Router()

router.get('/:id', Tag.getTagById)
router.get('/', Tag.getTags)
router.post('/create', authenticateAccount, Tag.createTag)
router.put('/update/:tag_id', Tag.updateTag)

module.exports = router
