// src/models/MemberView.js
const { DataTypes } = require('sequelize');
const sequelize = require('@configs/database');

const MemberView = sequelize.define('MemberView', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  member_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  question_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  saved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  viewing_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'member_views',
  timestamps: false,
});

module.exports = MemberView;
