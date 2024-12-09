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
const deleteTagController = async (req, res) => {
  const { id } = req.params // Lấy id từ URL params

  try {
    // Gọi hàm deleteTag từ service
    const result = await Tag.deleteTag(id)

    // Trả về phản hồi cho client dựa trên kết quả từ service
    res.status(result.status).json({ message: result.data })
  } catch (error) {
    console.error('Error in deleteTagController:', error)
    // Xử lý lỗi không mong muốn
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = { getTags, createTag, updateTag, deleteTagController }
