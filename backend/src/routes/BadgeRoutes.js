const express = require('express');
const { Badge } = require('@controllers/_index')

const router = express.Router();

const multer = require('multer');
const upload = multer();

router.get('/:id', Badge.getBadgeById)
router.get('/', Badge.getBadges)
router.post('/create', upload.none(), Badge.createBadge)
router.put('/update/:badge_id', upload.none(), Badge.updateBadge)

module.exports = router