const express = require('express');
const AccountController = require('@controllers/AccountController.js');
const QuestionController = require('@controllers/QuestionController.js');

const router = express.Router();

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

// Sử dụng POST vì bạn đang thay đổi req.body
router.get('/test', hahaha, AccountController.register);
router.get('/tie', hahaha, AccountController.login)

module.exports = router;
