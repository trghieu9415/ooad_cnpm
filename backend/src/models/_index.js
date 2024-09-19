const Sequelize = require('sequelize');
const config = require('@configs/database');

// Import các mô hình từ các file riêng biệt
const SystemAdministratorAccount = require('./SystemAdministratorAccount')
const Account = require('./Account')
const Member = require('./Member')
const Badge = require('./Badge')
const MemberBadge = require('./MemberBadge')
const Tag = require('./Tag')
const Question = require('./Question')
const MemberView = require('./MemberView')
const QuestionTag = require('./QuestionTag')
const Answer = require('./Answer')
const MemberVote = require('./MemberVote')
const AnswerFlag = require('./AnswerFlag')
const Comment = require('./Comment')
const CommentFlag = require('./CommentFlag')
const Photo = require('./Photo')
const Notification = require('./Notification')
const Bounty = require('./Bounty')
const QuestionEdit = require('./QuestionEdit')

module.exports = {
  SystemAdministratorAccount, Account, Member, Badge, MemberBadge,
  Tag, Question, MemberView, QuestionTag, Answer, MemberVote, AnswerFlag,
  Comment, CommentFlag, Photo, Notification, Bounty, QuestionEdit
};
  