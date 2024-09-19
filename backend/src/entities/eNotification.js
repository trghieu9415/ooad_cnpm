/**
 * Những sự kiện sẽ hiện thông báo:
 * - Có người upvote/downvote câu hỏi
 * - Có người comment vào câu hỏi
 * - Có người upvote/downvote câu trả lời
 * - Câu trả lời được lựa chọn là chính xác
 * - Câu hỏi bị bị thay đổi trạng thái
 * - Bài đăng được lưu có câu trả lời
 * - Nhận được danh hiệu
 */

const { Notification } = require('@models/_index');
const createResData = require('@utils/resMaker');

const getAllNotifications = async () => {
  try {
    const notifications = await Notification.findAll();
		return createResData(200, notifications);
  } catch (error) {
    return createResData(500, { error: error.message });
  }
};

const getNotificationById = async (id) => {
  try {
    const notification = await Notification.findByPk(id);
    if (notification) {
      return createResData(200, notification);
    } else {
      return createResData(404, { message: 'Notification not found' });
    }
  } catch (error) {
    throw error;
  }
};

const getMemberNotification = async (member_id) => {
  try {
    const notification = await Notification.findAll({
			where: { member_id },
      order: [['creation_time', 'DESC']],
		});
    if (notification) {
      return createResData(200, notification);
    } else {
      return createResData(404, { message: 'Notification not found' });
    }
  } catch (error) {
    throw error;
  }
};

const createNotification = async (member_id, content) => {
  try {
    const newNotification = await Notification.create({
			member_id,
      content,
    });
    return createResData(201, getNotificationById(newNotification.id).data);
  } catch (error) {
    return createResData(500, { error: error.message });
  }
};

const updateNotification = async (id, content, read) => {
  try {
		const notification = await Notification.findByPk(id)
		if (!notification) {
      return createResData(404, { message: 'Notification not found' });
    }
    await notification.update({
      content,
			read
    });
    return createResData(201, getNotificationById(id).data);
  } catch (error) {
    return createResData(500, { error: error.message });
  }
};

// CHỈ SỬ DỤNG HÀM NÀY KHI CHẮC CHẮN CÓ THỂ XÓA MÀ KHÔNG ẢNH HƯỞNG ĐẾN BẢNG KHÁC!!!
const deleteNotification = async (id) => {
	try {
    const deleted = await Notification.destroy({ where: { id: id } });
    if (deleted) {
			return createResData(204, 'Notification deleted')
    } else {
			return createResData(404, 'Notification not found')
    }
  } catch (error) {
		return createResData(500, { error: error.message })
  }
}

module.exports =  {
	getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
}