const { Badge } = require("@entities/_index")

const getBadges = async (req, res) => {
  try {
    const result = await Badge.getAllBadges()
    res.status(result.status).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getBadgeById = async (req, res) => {
  const badge_id = req.params.id
  try {
    const result = await Badge.getBadgeById(badge_id)
    res.status(result.status).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const createBadge = async (req, res) => {
  const { name, description } = req.body
  try {
    const result = await Badge.createBadge(name, description)
    res.status(result.status).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateBadge = async (req, res) => {
  const badge_id = req.params.badge_id
  const { name, description } = req.body
  try {
    const result = await Badge.updateBadge(badge_id, name, description)
    res.status(result.status).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  getBadges,
  getBadgeById,
  createBadge,
  updateBadge,
}