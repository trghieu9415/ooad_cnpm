// src/models/QuestionEdit.js
const { DataTypes } = require('sequelize')
const sequelize = require('@configs/database')

const QuestionEdit = sequelize.define(
  'QuestionEdit',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    question_id: {
      type: DataTypes.UUID
    },
    edit_time: {
      type: DataTypes.DATE
    },
    new_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    tableName: 'question_edits',
    timestamps: false
  }
)

module.exports = QuestionEdit
