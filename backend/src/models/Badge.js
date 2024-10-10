// src/models/Badge.js
const { DataTypes } = require('sequelize')
const sequelize = require('@configs/database')

const Badge = sequelize.define(
  'Badge',
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
    tableName: 'badges',
    timestamps: false
  }
)

module.exports = Badge
