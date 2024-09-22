const { Tag } = require('@models/_index');
const createResData = require('@utils/resMaker');

const getAllTags = async () => {
  try {
    const tags = await Tag.findAll();
		return createResData(200, tags);
  } catch (error) {
    return createResData(500, error);
  }
};

const getTagById = async (id) => {
  try {
    const tag = await Tag.findByPk(id);
    if (tag) {
      return createResData(200, tag);
    } else {
      return createResData(404, { message: 'Tag not found' });
    }
  } catch (error) {
    throw error;
  }
};

const createTag = async (name, description) => {
  try {
    const newTag = await Tag.create({
      name,
      description,
    });
    return createResData(201, (await getTagById(newTag.dataValues.id)).data);
  } catch (error) {
    return createResData(500, error);
  }
};

const updateTag = async (id, name, description) => {
  try {
		const tag = await Tag.findByPk(id)
		if (!tag) {
      return createResData(404, { message: 'Tag not found' });
    }
    await tag.update({
      name,
			description
    });
    return createResData(201, (await getTagById(id)).data);
  } catch (error) {
    return createResData(500, error);
  }
};

// CHỈ SỬ DỤNG HÀM NÀY KHI CHẮC CHẮN CÓ THỂ XÓA MÀ KHÔNG ẢNH HƯỞNG ĐẾN BẢNG KHÁC!!!
const deleteTag = async (id) => {
	try {
    const deleted = await Tag.destroy({ where: { id: id } });
    if (deleted) {
			return createResData(204, 'Tag deleted')
    } else {
			return createResData(404, 'Tag not found')
    }
  } catch (error) {
		return createResData(500, error)
  }
}

module.exports =  {
	getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag
}