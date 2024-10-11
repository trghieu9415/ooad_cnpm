// src/models/Notification.js
const { DataTypes } = require('sequelize')
const sequelize = require('@configs/database')

const Notification = sequelize.define(
  'Notification',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    member_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    creation_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    tableName: 'notifications',
    timestamps: false
  }
)

module.exports = Notification
