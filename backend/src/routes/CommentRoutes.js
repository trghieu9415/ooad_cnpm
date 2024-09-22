const express = require('express');
const { Comment } = require("@controllers/_index")
const authenticateAccount = require("@middlewares/authMiddleware")


const router = express.Router();

const multer = require('multer');
const upload = multer();

router.get('/:id', Comment.getCommentById);
router.get('/questions/:question_id', Comment.getCommentByQuestion);
router.post('/questions/:question_id/create', upload.none(), authenticateAccount, Comment.createComment);

module.exports = router