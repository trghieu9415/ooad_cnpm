const { Tag } = require('@entities/_index')

const getTags = async (req, res) => {
  try {
    const result = await Tag.getAllTags()
    res.status(result.status).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const createTag = async (req, res) => {
  const { name, description } = req.body
  try {
    const result = await Tag.createTag(name, description)
    res.status(result.status).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateTag = async (req, res) => {
  const tag_id = req.params.id
  const { name, description } = req.body
  try {
    const result = await Tag.updateTag(tag_id, name, description)
    res.status(result.status).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = { getTags, createTag, updateTag }
