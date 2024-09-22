const express = require('express');
const { Answer } = require("@controllers/_index")
const authenticateAccount = require("@middlewares/authMiddleware")

const router = express.Router();

const multer = require('multer');
const upload = multer();

router.get('/:id', Answer.getAnswerById)
router.post('/question/:question_id/create', authenticateAccount, upload.none(), Answer.createAnswer)
router.get('/question/:question_id', Answer.getAnswerByQuestion)
router.put('/:id/correct', authenticateAccount, Answer.setCorrectAnswer)

module.exports = router