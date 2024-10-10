const { Member, Badge, Account, MemberView, MemberFlag, MemberVote } = require('@models/_index')
const createResData = require('@utils/resMaker')

const getAllMembers = async () => {
  try {
    const members = await Member.findAll({
      include: [
        {
          model: Account,
          attributes: ['username']
        },
        {
          model: Badge,
          attributes: ['id', 'name', 'description'],
          required: false
        }
      ]
    })
    return createResData(200, members)
  } catch (error) {
    return createResData(500, error)
  }
}

const getMemberById = async (id) => {
  try {
    const member = await Member.findByPk(id, {
      include: [
        {
          model: Account,
          attributes: ['username']
        },
        {
          model: Badge,
          attributes: ['id', 'name', 'description'],
          required: false
        }
      ]
    })
    if (member) {
      return createResData(200, member)
    } else {
      return createResData(404, { message: 'Member not found' })
    }
  } catch (error) {
    return createResData(500, error)
  }
}

const createMember = async (account_id, name, email, phone, biography) => {
  try {
    if (await isEmailExisted(email)) {
      return createResData(409, { message: 'Email already exists' })
    } else if (await isPhoneExisted(phone)) {
      return createResData(409, { message: 'Phone already exists' })
    }
    const newMember = await Member.create({
      account_id,
      name,
      email,
      phone,
      biography
    })
    return createResData(201, (await getMemberById(newMember.dataValues.id)).data)
  } catch (error) {
    return createResData(500, error)
  }
}
const updateMember = async (id, name, email, phone, biography) => {
  try {
    const member = await Member.findByPk(id)
    if (!member) {
      return createResData(404, { message: 'Member not found' })
    }

    if (member.email !== email && isEmailExisted(email)) {
      return createResData(409, { message: 'Email already exists' })
    }
    if (member.phone !== phone && isPhoneExisted(phone)) {
      return createResData(409, { message: 'Phone already exists' })
    }
    await member.update({
      name,
      email,
      phone,
      biography
    })

    const updatedMember = await getMemberById(id)
    if (!updatedMember) {
      return createResData(500, { message: 'Error retrieving updated member' })
    }

    return createResData(200, updatedMember.data)
  } catch (error) {
    return createResData(500, { message: 'An error occurred during the update process', error: error.message })
  }
}

// CHỈ SỬ DỤNG HÀM NÀY KHI CHẮC CHẮN CÓ THỂ XÓA MÀ KHÔNG ẢNH HƯỞNG ĐẾN BẢNG KHÁC!!!
const deleteMember = async (id) => {
  try {
    const deleted = await Member.destroy({ where: { id: id } })
    if (deleted) {
      return createResData(204, 'Member deleted')
    } else {
      return createResData(404, 'Member not found')
    }
  } catch (error) {
    return createResData(500, error)
  }
}

const isPhoneExisted = async (phone) => {
  try {
    const counted = await Member.count({
      where: { phone: phone }
    })
    return counted === 0 ? false : true
  } catch (error) {
    throw error
  }
}

const isEmailExisted = async (email) => {
  try {
    const counted = await Member.count({
      where: { email: email }
    })
    return counted === 0 ? false : true
  } catch (error) {
    throw error
  }
}

const getReputationById = async (id) => {
  try {
    const returnObj = await Member.findOne({
      where: { id: id },
      attributes: ['reputation']
    })
    return returnObj.dataValues.reputation
  } catch (error) {
    throw error
  }
}

const setReputationById = async (id, reputation) => {
  try {
    const member = await Member.findByPk(id)
    if (!member) {
      return createResData(404, { message: 'Member not found' })
    }
    await member.update({ reputation })
    return createResData(200, (await getMemberById(id)).data)
  } catch (error) {
    return createResData(500, error)
  }
}

const vote = async (id, related_id, related_type, vote_type) => {
  try {
    let whereClause = { member_id: id }
    let createData = { member_id: id, vote_type: vote_type, related_type: related_type }

    if (related_type === 'Question') {
      whereClause.question_id = related_id
      createData.question_id = related_id
    } else if (related_type === 'Answer') {
      whereClause.answer_id = related_id
      createData.answer_id = related_id
    } else {
      return createResData(406, new Error('Invalid vote type'))
    }

    const existingVote = await MemberVote.findOne({ where: whereClause })

    if (!existingVote) {
      await MemberVote.create(createData)
    } else if (existingVote.dataValues.vote_type === 'Unvote') {
      await MemberVote.destroy({ where: whereClause })
    } else if (existingVote.dataValues.vote_type !== vote_type) {
      await existingVote.update({ vote_type: vote_type })
    }
  } catch (error) {
    throw error
  }
}

const flag = async (id, related_id, related_type, flag_type) => {
  try {
    let whereClause = { member_id: id }
    let createData = { member_id: id, related_type: related_type }

    if (related_type === 'Question') {
      whereClause.question_id = related_id
      createData.question_id = related_id
    } else if (related_type === 'Answer') {
      whereClause.answer_id = related_id
      createData.answer_id = related_id
    } else if (related_type === 'Comment') {
      whereClause.comment_id = related_id
      createData.comment_id = related_id
    } else {
      return createResData(406, new Error('Invalid flag type'))
    }

    const existingFlag = await MemberFlag.findOne({ where: whereClause })

    if (!existingFlag && flag_type) {
      await MemberFlag.create(createData)
    } else if (existingFlag && !flag_type) {
      await MemberFlag.destroy({ where: whereClause })
    }
  } catch (error) {
    throw error
  }
}

const viewQuestion = async (id, question_id) => {
  try {
    const existingView = await MemberView.findOne({
      where: { member_id: id, question_id: question_id }
    })

    if (!existingView) {
      await MemberView.create({ member_id: id, question_id: question_id })
      return createResData(201, { message: 'View recorded successfully.' })
    }

    return createResData(200, { message: 'View already exists.' })
  } catch (error) {
    return createResData(500, error)
  }
}

const saveQuestion = async (id, question_id, type) => {
  try {
    const memberView = await MemberView.findOne({
      where: { member_id: id, question_id: question_id }
    })

    if (!memberView) {
      await MemberView.create({ member_id: id, question_id: question_id, saved: type })
    } else {
      await memberView.update({ saved: type })
    }

    return createResData(200, { message: 'Save question successful' })
  } catch (error) {
    return createResData(500, error)
  }
}

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  getReputationById,
  setReputationById,
  vote,
  flag,
  viewQuestion,
  saveQuestion
}
