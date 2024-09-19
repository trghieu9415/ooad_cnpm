// src/models/Answer.js
const { DataTypes } = require('sequelize');
const sequelize = require('@configs/database');

const Answer = sequelize.define('Answer', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  question_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  member_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  answer_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  accepted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  creation_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
}, {
  tableName: 'answers',
  timestamps: false,
});

module.exports = Answer;
