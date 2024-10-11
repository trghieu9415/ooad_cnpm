// src/models/MemberVote.js
const { DataTypes } = require('sequelize')
const sequelize = require('@configs/database')

const MemberVote = sequelize.define(
  'MemberVote',
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
    },
    vote_type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'member_votes',
    timestamps: false
  }
)

module.exports = MemberVote
