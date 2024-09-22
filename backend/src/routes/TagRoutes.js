const express = require('express');
const { Tag } = require("@controllers/_index")
const authenticateAccount = require("@middlewares/authMiddleware")

const router = express.Router();

const multer = require('multer');
const upload = multer();

router.get('/:id', Tag.getTagById)
router.get('/', Tag.getTags)
router.post('/create', authenticateAccount, upload.none(), Tag.createTag)
router.put('/update/:tag_id', upload.none(), Tag.updateTag)

module.exports = router