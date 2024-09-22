const express = require('express');
const AccountController = require('@controllers/AccountController.js');
const MemberController = require('@controllers/MemberController.js');
const QuestionController = require('@controllers/QuestionController.js');
const authenticateAccount = require('@middlewares/authMiddleware.js');

const router = express.Router();

const multer = require('multer');
const upload = multer();

// Middleware để thay đổi req.body trước khi xử lý request
const hahaha = (req, res, next) => {
  req.body = {
    username: 'tester', 
    password: 'abcdefghi',
    name: 'HE HE HE',
    email: 'ief@igp.cls', 
    phone: '0223112330', 
    biography: 'a short biography'
  };

  next(); 
};

// router.get('/change', (req, res, next) => {
//   req.account_id = 'e01bdd86-27e9-4b6c-a9ca-961699c20de8'
//   next()
// }, upload.none(), AccountController.changePassword)

// Sử dụng POST vì bạn đang thay đổi req.body
router.get('/test', hahaha, AccountController.register);
router.get('/tie', hahaha, AccountController.login)

router.get('/getinfo', authenticateAccount, MemberController.getAllMember);

router.get('/q/:question_id', QuestionController.getQuestionById)
router.get('/q/', QuestionController.getQuestions)



module.exports = router;
