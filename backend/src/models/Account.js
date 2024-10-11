// src/models/Account.js
const { DataTypes } = require('sequelize')
const sequelize = require('@configs/database')

const Account = sequelize.define(
  'Account',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Active'
    },
    registration_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  },
  {
    tableName: 'accounts',
    timestamps: false
  }
)

module.exports = Account
