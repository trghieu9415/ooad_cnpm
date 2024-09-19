const { Bounty } = require('@models/_index');
const createResData = require('@utils/resMaker');

const getAllBounties = async () => {
  try {
    const bounties = await Bounty.findAll();
		return createResData(200, bounties);
  } catch (error) {
    return createResData(500, { error: error.message });
  }
};

const getBountyById = async (id) => {
  try {
    const bounty = await Bounty.findByPk(id);
    if (bounty) {
      return createResData(200, bounty);
    } else {
      return createResData(404, { message: 'Bounty not found' });
    }
  } catch (error) {
    throw error;
  }
};

const getCurrentBountyByQuestionId = async (question_id) => {
  try {
    const bounty = await Bounty.findOne({
			where: {
				question_id: question_id,
				ended: false,
				expiry: { [Op.gt]: new Date() } 
			},
      order: [['expiry', 'DESC']]
		});
    if (bounty) {
      return createResData(200, bounty);
    } else {
      return createResData(404, { message: 'Bounty not found' });
    }
  } catch (error) {
    throw error;
  }
};

const createBounty = async (question_id, reputation, expiry) => {
  try {
    const newBounty = await Bounty.create({
      question_id,
      reputation,
			expiry
    });
    return createResData(201, getBountyById(newBounty.id).data);
  } catch (error) {
    return createResData(500, { error: error.message });
  }
};

const updateBounty = async (id, reputation, expiry, ended) => {
  try {
		const bounty = await Bounty.findByPk(id)
		if (!bounty) {
      return createResData(404, { message: 'Bounty not found' });
    }
    await bounty.update({
      reputation,
			expiry,
			ended
    });
    return createResData(201, getBountyById(id).data);
  } catch (error) {
    return createResData(500, { error: error.message });
  }
};

// CHỈ SỬ DỤNG HÀM NÀY KHI CHẮC CHẮN CÓ THỂ XÓA MÀ KHÔNG ẢNH HƯỞNG ĐẾN BẢNG KHÁC!!!
const deleteBounty = async (id) => {
	try {
    const deleted = await Bounty.destroy({ where: { id: id } });
    if (deleted) {
			return createResData(204, 'Bounty deleted')
    } else {
			return createResData(404, 'Bounty not found')
    }
  } catch (error) {
		return createResData(500, { error: error.message })
  }
}

export default {
	getAllBounties,
  getBountyById,
	getCurrentBountyByQuestionId,
  createBounty,
  updateBounty,
  deleteBounty
}