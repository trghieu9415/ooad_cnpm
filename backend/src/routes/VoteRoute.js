const express = require('express')
const { getAllMemberVotesController } = require('../controllers/VoteController')

const router = express.Router()

router.get('/member-votes', getAllMemberVotesController)

module.exports = router
