// src/models/Tag.js
const { DataTypes } = require('sequelize')
const sequelize = require('@configs/database')

const Tag = sequelize.define(
  'Tag',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'tags',
    timestamps: false
  }
)

module.exports = Tag
