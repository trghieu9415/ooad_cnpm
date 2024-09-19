// src/models/SystemAdministratorAccount.js
const { DataTypes } = require('sequelize');
const sequelize = require('@configs/database');

const SystemAdministratorAccount = sequelize.define('SystemAdministratorAccount', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'system_administrator_account',
  timestamps: false,
});

module.exports = SystemAdministratorAccount;
