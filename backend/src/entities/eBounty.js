const { Bounty, Member } = require('@models/_index')
const createResData = require('@utils/resMaker')
const { Op } = require('sequelize')

const getAllBounties = async () => {
  try {
    const bounties = await Bounty.findAll()
    return createResData(200, bounties)
  } catch (error) {
    return createResData(500, error)
  }
}

const getBountyById = async (id) => {
  try {
    const bounty = await Bounty.findByPk(id)
    if (bounty) {
      return createResData(200, bounty)
    } else {
      return createResData(404, { message: 'Bounty not found' })
    }
  } catch (error) {
    throw error
  }
}

const getCurrentBountyByQuestionId = async (question_id) => {
  try {
    const bounty = await Bounty.findOne({
      where: {
        question_id: question_id,
        ended: false,
        expiry: { [Op.gt]: new Date() }
      },
      order: [['expiry', 'DESC']]
    })
    if (bounty) {
      return createResData(200, bounty)
    } else {
      return createResData(404, { message: 'Bounty not found' })
    }
  } catch (error) {
    throw error
  }
}

const createBounty = async (question_id, reputation, expiry) => {
  try {
    const newBounty = await Bounty.create({
      question_id,
      reputation,
      expiry
    })
    return createResData(201, (await getBountyById(newBounty.dataValues.id)).data)
  } catch (error) {
    return createResData(500, error)
  }
}

const updateBounty = async (id, reputation, expiry, ended) => {
  try {
    const bounty = await Bounty.findByPk(id)
    if (!bounty) {
      return createResData(404, { message: 'Bounty not found' })
    }
    await bounty.update({
      reputation,
      expiry,
      ended
    })
    return createResData(201, (await getBountyById(id)).data)
  } catch (error) {
    return createResData(500, error)
  }
}

// CHỈ SỬ DỤNG HÀM NÀY KHI CHẮC CHẮN CÓ THỂ XÓA MÀ KHÔNG ẢNH HƯỞNG ĐẾN BẢNG KHÁC!!!
const deleteBounty = async (id) => {
  try {
    const deleted = await Bounty.destroy({ where: { id: id } })
    if (deleted) {
      return createResData(204, { message: 'Bounty deleted' })
    } else {
      return createResData(404, { message: 'Bounty not found' })
    }
  } catch (error) {
    return createResData(500, error)
  }
}

const createQuestionBounty = async (question_id, reputation_point) => {
  try {
    const currentBounty = await getCurrentBountyByQuestionId(question_id)
    if (currentBounty.success) {
      await deleteBounty(currentBounty.data.id)
    }
    const newBounty = await createBounty(question_id, reputation_point, new Date(Date.now() + 99 * 24 * 60 * 60 * 1000))
    return createResData(201, newBounty.data)
  } catch (error) {
    return createResData(500, error.message)
  }
}

const awardBounty = async (question_id, member_id) => {
  try {
    const currentBounty = await getCurrentBountyByQuestionId(question_id)

    if (currentBounty.success) {
      const member = await Member.findByPk(member_id)
      if (!member) {
        return createResData(404, 'Member not found')
      }

      const bounty = await Bounty.findByPk(currentBounty.data.id)
      if (!bounty) {
        return createResData(404, 'Bounty not found')
      }

      await bounty.update({ ended: true })

      const updatedReputation = member.reputation + bounty.reputation
      await member.update({ reputation: updatedReputation })

      return createResData(201, {
        message: 'Awarded bounty successfully',
        memberId: member.id,
        updatedReputation
      })
    } else {
      return createResData(400, 'No valid bounty available for this question')
    }
  } catch (error) {
    return createResData(500, error.message)
  }
}

module.exports = {
  getCurrentBountyByQuestionId,
  createQuestionBounty,
  awardBounty
}
