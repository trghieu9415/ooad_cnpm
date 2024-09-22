const express = require('express');
const { Account } = require("@controllers/_index");
const authenticateAccount = require("@middlewares/authMiddleware")

const router = express.Router();

const multer = require('multer');
const upload = multer();

router.post('/login', upload.none(), Account.login)
router.post('/register', upload.none(), Account.register)
router.get('/logout', Account.logout)
router.put('/changepassword', authenticateAccount, upload.none(), Account.changePassword)
router.post('/forgotpassword', Account.forgotPassword)

module.exports = router