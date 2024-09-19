// src/models/AnswerFlag.js
const { DataTypes } = require('sequelize');
const sequelize = require('@configs/database');
const Member = require('./Member');
const Answer = require('./Answer');

const AnswerFlag = sequelize.define('AnswerFlag', {
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
    allowNull: false,
  },
}, {
  tableName: 'answer_flags',
  timestamps: false,
});

AnswerFlag.belongsTo(Member, { foreignKey: 'member_id' });
AnswerFlag.belongsTo(Answer, { foreignKey: 'answer_id' });

module.exports = AnswerFlag;
