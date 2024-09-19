const { Photo } = require('@models/_index');
const createResData = require('@utils/resMaker');

const getAllPhotos = async () => {
  try {
    const photos = await Photo.findAll();
		return createResData(200, photos);
  } catch (error) {
    return createResData(500, { error: error.message });
  }
};

const getPhotoById = async (id) => {
  try {
    const photo = await Photo.findByPk(id);
    if (photo) {
      return createResData(200, photo);
    } else {
      return createResData(404, { message: 'Photo not found' });
    }
  } catch (error) {
    throw error;
  }
};

const createPhoto = async (question_id, answer_id, path, related_type) => {
  try {
    const newPhoto = await Photo.create({
      question_id, answer_id, path, related_type
    });
    return createResData(201, getPhotoById(newPhoto.id).data);
  } catch (error) {
    return createResData(500, { error: error.message });
  }
};

const updatePhoto = async (path) => {
  try {
		const photo = await Photo.findByPk(id)
		if (!photo) {
      return createResData(404, { message: 'Photo not found' });
    }
    await photo.update({
      path
    });
    return createResData(201, getPhotoById(id).data);
  } catch (error) {
    return createResData(500, { error: error.message });
  }
};

// CHỈ SỬ DỤNG HÀM NÀY KHI CHẮC CHẮN CÓ THỂ XÓA MÀ KHÔNG ẢNH HƯỞNG ĐẾN BẢNG KHÁC!!!
const deletePhoto = async (id) => {
	try {
    const deleted = await Photo.destroy({ where: { id: id } });
    if (deleted) {
			return createResData(204, 'Photo deleted')
    } else {
			return createResData(404, 'Photo not found')
    }
  } catch (error) {
		return createResData(500, { error: error.message })
  }
}

module.exports =  {
	getAllPhotos,
  getPhotoById,
  createPhoto,
  updatePhoto,
  deletePhoto
}