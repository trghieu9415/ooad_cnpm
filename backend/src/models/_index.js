const Sequelize = require('sequelize')
const config = require('@configs/database')

// Import các mô hình từ các file riêng biệt
const SystemAdministratorAccount = require('./admin/SystemAdministratorAccount')
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
const Comment = require('./Comment')
const MemberFlag = require('./MemberFlag')
const Photo = require('./Photo')
const Notification = require('./Notification')
const Bounty = require('./Bounty')
const QuestionEdit = require('./QuestionEdit')

Account.hasOne(Member, { foreignKey: 'account_id' })
Member.belongsTo(Account, { foreignKey: 'account_id' })

Member.hasMany(Question, { foreignKey: 'member_id' })
Question.belongsTo(Member, { foreignKey: 'member_id' })

Question.belongsToMany(Tag, { through: QuestionTag, foreignKey: 'question_id' })
Tag.belongsToMany(Question, { through: QuestionTag, foreignKey: 'tag_id' })

Question.hasMany(Answer, { foreignKey: 'question_id' })
Answer.belongsTo(Question, { foreignKey: 'question_id' })

Answer.hasMany(MemberVote, { foreignKey: 'answer_id' })
MemberVote.belongsTo(Answer, { foreignKey: 'answer_id' })

Question.hasMany(MemberVote, { foreignKey: 'question_id' })
MemberVote.belongsTo(Question, { foreignKey: 'question_id' })

Member.hasMany(MemberVote, { foreignKey: 'member_id' })
MemberVote.belongsTo(Member, { foreignKey: 'member_id' })

Member.belongsToMany(Badge, { through: MemberBadge, foreignKey: 'member_id' })
Badge.belongsToMany(Member, { through: MemberBadge, foreignKey: 'badge_id' })

Question.hasMany(Photo, { foreignKey: 'question_id' })
Photo.belongsTo(Question, { foreignKey: 'question_id' })

Answer.hasMany(Photo, { foreignKey: 'answer_id' })
Photo.belongsTo(Answer, { foreignKey: 'answer_id' })

Member.hasMany(MemberView, { foreignKey: 'member_id' })
MemberView.belongsTo(Member, { foreignKey: 'member_id' })

Question.hasMany(MemberView, { foreignKey: 'question_id' })
MemberView.belongsTo(Question, { foreignKey: 'question_id' })

Member.hasMany(Notification, { foreignKey: 'member_id' })
Notification.belongsTo(Member, { foreignKey: 'member_id' })

MemberFlag.belongsTo(Comment, { foreignKey: 'comment_id', as: 'comment' })
MemberFlag.belongsTo(Answer, { foreignKey: 'answer_id', as: 'answer' })
MemberFlag.belongsTo(Question, { foreignKey: 'question_id', as: 'question' })

Answer.belongsTo(Member, { foreignKey: 'member_id', as: 'member' })
Question.belongsTo(Member, { foreignKey: 'member_id', as: 'member' })
Comment.belongsTo(Member, { foreignKey: 'member_id', as: 'member' })
module.exports = {
  SystemAdministratorAccount,
  Account,
  Member,
  Badge,
  MemberBadge,
  Tag,
  Question,
  MemberView,
  QuestionTag,
  Answer,
  MemberVote,
  Comment,
  MemberFlag,
  Photo,
  Notification,
  Bounty,
  QuestionEdit
}
