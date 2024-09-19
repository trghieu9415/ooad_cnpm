// src/models/QuestionTag.js
const { DataTypes } = require('sequelize');
const sequelize = require('@configs/database');

const QuestionTag = sequelize.define('QuestionTag', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  question_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  tag_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'question_tags',
  timestamps: false,
});

module.exports = QuestionTag;
