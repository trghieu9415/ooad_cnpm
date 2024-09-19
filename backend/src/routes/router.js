const MemberController = require('@controllers/MemberController.js');
const QuestionController = require('@controllers/QuestionController.js');

const router = require('express').Router();
router.get('/members', MemberController.getAllMembers);
router.get('/questions', QuestionController.getAllQuestions);
router.get('/questions/id/:id', QuestionController.getQuestionById);


module.exports = router;