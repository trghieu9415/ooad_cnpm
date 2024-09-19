// src/models/MemberView.js
const { DataTypes } = require('sequelize');
const sequelize = require('@configs/database');
const Member = require('./Member');
const Question = require('./Question');

const MemberView = sequelize.define('MemberView', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  member_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  question_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  flagged: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  viewing_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'member_views',
  timestamps: false,
});

MemberView.belongsTo(Member, { foreignKey: 'member_id' });
MemberView.belongsTo(Question, { foreignKey: 'question_id' });

module.exports = MemberView;
