// src/models/Photo.js
const { DataTypes } = require('sequelize')
const sequelize = require('@configs/database')

const Photo = sequelize.define(
  'Photo',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    question_id: {
      type: DataTypes.UUID
    },
    answer_id: {
      type: DataTypes.UUID
    },
    related_type: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'photos',
    timestamps: false
  }
)

module.exports = Photo
