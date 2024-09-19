// src/models/Question.js
const { DataTypes } = require('sequelize');
const sequelize = require('@configs/database');
const Member = require('./Member');

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  member_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  question_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  creation_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  update_time: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Open',
  },
  closing_remark: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'questions',
  timestamps: false,
});

Question.belongsTo(Member, { foreignKey: 'member_id' });

module.exports = Question;
