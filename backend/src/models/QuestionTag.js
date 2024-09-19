// src/models/QuestionTag.js
const { DataTypes } = require('sequelize');
const sequelize = require('@configs/database');
const Question = require('./Question');
const Tag = require('./Tag');

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

QuestionTag.belongsTo(Question, { foreignKey: 'question_id' });
QuestionTag.belongsTo(Tag, { foreignKey: 'tag_id' });

module.exports = QuestionTag;
