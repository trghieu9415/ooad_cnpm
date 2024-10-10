const express = require('express')
const { Badge } = require('@controllers/_index')

const router = express.Router()

router.get('/:id', Badge.getBadgeById)
router.get('/', Badge.getBadges)
router.post('/create', Badge.createBadge)
router.put('/update/:badge_id', Badge.updateBadge)

module.exports = router
