// src/models/CommentFlag.js
const { DataTypes } = require('sequelize');
const sequelize = require('@configs/database');
const Member = require('./Member');
const Comment = require('./Comment');

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

CommentFlag.belongsTo(Member, { foreignKey: 'member_id' });
CommentFlag.belongsTo(Comment, { foreignKey: 'comment_id' });

module.exports = CommentFlag;
