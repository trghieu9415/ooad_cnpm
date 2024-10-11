// src/models/CommentFlag.js
const { DataTypes } = require('sequelize')
const sequelize = require('@configs/database')

const MemberFlag = sequelize.define(
  'MemberFlag',
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
    comment_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    answer_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    question_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    related_type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'member_flags',
    timestamps: false
  }
)

module.exports = MemberFlag
