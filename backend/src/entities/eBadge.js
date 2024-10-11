const { Badge } = require('@models/_index')
const createResData = require('@utils/resMaker')

const getAllBadges = async () => {
  try {
    const badges = await Badge.findAll()
    return createResData(200, badges)
  } catch (error) {
    return createResData(500, error)
  }
}

const getBadgeById = async (id) => {
  try {
    const badge = await Badge.findByPk(id)
    if (badge) {
      return createResData(200, badge)
    } else {
      return createResData(404, { message: 'Badge not found' })
    }
  } catch (error) {
    throw error
  }
}

const createBadge = async (name, description) => {
  try {
    const newBadge = await Badge.create({
      name,
      description
    })
    return createResData(201, (await getBadgeById(newBadge.dataValues.id)).data)
  } catch (error) {
    return createResData(500, error)
  }
}

const updateBadge = async (id, name, description) => {
  try {
    const badge = await Badge.findByPk(id)
    if (!badge) {
      return createResData(404, { message: 'Badge not found' })
    }
    await badge.update({
      name,
      description
    })
    return createResData(201, (await getBadgeById(id)).data)
  } catch (error) {
    return createResData(500, error)
  }
}

// CHỈ SỬ DỤNG HÀM NÀY KHI CHẮC CHẮN CÓ THỂ XÓA MÀ KHÔNG ẢNH HƯỞNG ĐẾN BẢNG KHÁC!!!
const deleteBadge = async (id) => {
  try {
    const deleted = await Badge.destroy({ where: { id: id } })
    if (deleted) {
      return createResData(204, { message: 'Badge deleted' })
    } else {
      return createResData(404, { message: 'Badge not found' })
    }
  } catch (error) {
    return createResData(500, error)
  }
}

module.exports = {
  getAllBadges,
  getBadgeById,
  createBadge,
  updateBadge,
  deleteBadge
}
