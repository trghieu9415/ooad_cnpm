// src/models/CommentFlag.js
const { DataTypes } = require('sequelize');
const sequelize = require('@configs/database');

const CommentFlag = sequelize.define('CommentFlag', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  member_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  comment_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'comment_flags',
  timestamps: false,
});

module.exports = CommentFlag;
