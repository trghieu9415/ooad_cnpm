// src/models/AnswerFlag.js
const { DataTypes } = require('sequelize');
const sequelize = require('@configs/database');

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

module.exports = AnswerFlag;
