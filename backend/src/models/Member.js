// src/models/Member.js
const { DataTypes } = require('sequelize');
const sequelize = require('@configs/database');
const Account = require('./Account'); // Quan hệ với Account

const Member = sequelize.define('Member', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  account_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  reputation: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  biography: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'members',
  timestamps: false,
});

Member.belongsTo(Account, { foreignKey: 'account_id' });

module.exports = Member;
