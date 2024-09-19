// src/models/MemberBadge.js
const { DataTypes } = require('sequelize');
const sequelize = require('@configs/database');
const Member = require('./Member');
const Badge = require('./Badge');

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

MemberBadge.belongsTo(Member, { foreignKey: 'member_id' });
MemberBadge.belongsTo(Badge, { foreignKey: 'badge_id' });

module.exports = MemberBadge;
