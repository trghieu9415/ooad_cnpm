// src/models/MemberBadge.js
const { DataTypes } = require('sequelize');
const sequelize = require('@configs/database');


const MemberBadge = sequelize.define('MemberBadge', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  member_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  badge_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'member_badges',
  timestamps: false,
});

module.exports = MemberBadge;
