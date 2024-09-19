// src/models/Photo.js
const { DataTypes } = require('sequelize');
const sequelize = require('@configs/database');
const Question = require('./Question');
const Answer = require('./Answer');

const Photo = sequelize.define('Photo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  question_id: {
    type: DataTypes.UUID,
  },
  answer_id: {
    type: DataTypes.UUID,
  },
  related_type: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'photos',
  timestamps: false,
});

Photo.belongsTo(Question, { foreignKey: 'question_id' });
Photo.belongsTo(Answer, { foreignKey: 'answer_id' });

module.exports = Photo;
