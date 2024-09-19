const { Member, Badge, MemberBadge } = require('@models/_index');
const createResData = require('@utils/resMaker');

const getAllMembers = async () => {
	try {
		const members = await Member.findAll();
		const membersWithBadges = await Promise.all(
			members.map(async (member) => {
				member.badges = getMemberBadgeById(member.id);
				return member
			})
		)
		return createResData(200, membersWithBadges);
	} catch (error) {
		return createResData(500, { error: error.message });
	}
}

const getMemberById = async (id) => {
	try {
    const member = await Member.findByPk(id);
		if (member) {
			member.badges = await getMemberBadgeById(id);
			return createResData(200, member);
		} else {
			return createResData(404, { message: 'Member not found' });
		}
  } catch (error) {
    return createResData(500, { error: error.message });
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
      account_id, name, email, phone, biography
    });
    return createResData(201, newMember);
  } catch (error) {
    return createResData(500, { error: error.message });
  }
}

const updateMember = async (id, name, email, phone, reputation, role, biography) => {
	try {
    const member = await Member.findByPk(id);
    if (!member) {
      return createResData(404, { message: 'Member not found' });
    }
    if (isEmailExisted(email)) {
      return createResData(409, { message: 'Email already exists' })
    } else if (isPhoneExisted(phone)) {
      return createResData(409, { message: 'Phone already exists' })
    }
    await member.update({
      name, email, phone,
      reputation, role, biography
    });
    return createResData(200, getMemberById(id).data);
  } catch (error) {
    return createResData(500, { error: error.message });
  }
}

// CHỈ SỬ DỤNG HÀM NÀY KHI CHẮC CHẮN CÓ THỂ XÓA MÀ KHÔNG ẢNH HƯỞNG ĐẾN BẢNG KHÁC!!!
const deleteMember = async (id) => {
	try {
    const deleted = await Member.destroy({ where: { id: id } });
    if (deleted) {
			return createResData(204, 'Member deleted')
    } else {
			return createResData(404, 'Member not found')
    }
  } catch (error) {
		return createResData(500, { error: error.message })
  }
}

const getMemberBadgeById = async (id) => {
  try {
    const memberBadges = await MemberBadge.findAll({
      where: { member_id: id },
      include: [{
        model: Badge
      }],
      attributes: []
    });
    return memberBadges
  } catch (error) {
    throw error
  }
}

const isPhoneExisted = async (phone) => {
	try {
    const counted = await Member.count({
      where: { phone: phone },
    })
    return counted === 0 ? false : true
  } catch (error) {
    throw error
  } 
}

const isEmailExisted = async (email) => {
	try {
    const counted = await Member.count({
      where: { email: email },
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
      attributes: ['reputation'],
    })
    return returnObj.reputation
  } catch (error) {
    throw error
  } 
}

const setReputationById = async (id, reputation) => {
  try {
    const member = await Member.findByPk(id);
    if (!member) {
      return createResData(404, { message: 'Member not found' });
    }
    await member.update({ reputation });
    return createResData(200, getMemberById(id).data);
  } catch (error) {
    return createResData(500, { error: error.message });
  }
}

module.exports =  {
	getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  getReputationById,
  setReputationById
}