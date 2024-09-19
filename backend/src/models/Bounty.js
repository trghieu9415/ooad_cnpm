// src/models/Bounty.js
const { DataTypes } = require('sequelize');
const sequelize = require('@configs/database');
const Question = require('./Question');

const Bounty = sequelize.define('Bounty', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  question_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  reputation: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expiry: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ended: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  tableName: 'bounties',
  timestamps: false,
});

Bounty.belongsTo(Question, { foreignKey: 'question_id' });

module.exports = Bounty;
