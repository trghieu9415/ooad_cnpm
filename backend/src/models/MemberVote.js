// src/models/MemberVote.js
const { DataTypes } = require('sequelize');
const sequelize = require('@configs/database');
const Member = require('./Member');
const Answer = require('./Answer');
const Question = require('./Question');

const MemberVote = sequelize.define('MemberVote', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  member_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  answer_id: {
    type: DataTypes.UUID,
  },
  question_id: {
    type: DataTypes.UUID,
  },
  related_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vote_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'member_votes',
  timestamps: false,
});

MemberVote.belongsTo(Member, { foreignKey: 'member_id' });
MemberVote.belongsTo(Answer, { foreignKey: 'answer_id' });
MemberVote.belongsTo(Question, { foreignKey: 'question_id' });

module.exports = MemberVote;
