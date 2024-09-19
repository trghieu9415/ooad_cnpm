const { Answer, MemberVote, AnswerFlag } = require('@models/_index');
const createResData = require('@utils/resMaker');

const getAllAnswers = async () => {
  try {
    const answers = await Answer.findAll();
		const answersWithVotes = await Promise.all(
			answers.map(async (answer) => {
        [answer.voteCount, answer.flagCount] = getVoteFlagById(answer.id)
				return answer
      })
		)
		return createResData(200, answersWithVotes);
  } catch (error) {
    return createResData(500, { error: error.message });
  }
};

const getAnswerById = async (id) => {
  try {
    const answer = await Answer.findByPk(id);
    if (answer) {
      [answer.voteCount, answer.flagCount] =
        getVoteFlagById(answer.id);
      return createResData(200, answer);
    } else {
      return createResData(404, { message: 'Answer not found' });
    }
  } catch (error) {
    throw error;
  }
};

const createAnswer = async (question_id, member_id, answer_text) => {
  try {
    const newAnswer = await Answer.create({
      question_id,
      member_id,
      answer_text,
    });
    return createResData(201, getAnswerById(newAnswer.id).data);
  } catch (error) {
    return createResData(500, { error: error.message });
  }
};

const updateAnswer = async (id, answer_text, accepted) => {
  try {
		const answer = await Answer.findByPk(id)
		if (!answer) {
      return createResData(404, { message: 'Answer not found' });
    }
    await answer.update({
      answer_text,
			accepted
    });
    return createResData(201, getAnswerById(id).data);
  } catch (error) {
    return createResData(500, { error: error.message });
  }
};

// CHỈ SỬ DỤNG HÀM NÀY KHI CHẮC CHẮN CÓ THỂ XÓA MÀ KHÔNG ẢNH HƯỞNG ĐẾN BẢNG KHÁC!!!
const deleteAnswer = async (id) => {
	try {
    const deleted = await Answer.destroy({ where: { id: id } });
    if (deleted) {
			return createResData(204, 'Answer deleted')
    } else {
			return createResData(404, 'Answer not found')
    }
  } catch (error) {
		return createResData(500, { error: error.message })
  }
}

const getVoteFlagById = async (id) => {
  try {
    const upvote = await MemberVote.count({
      where: { answer_id: id, vote_type: 'upvote' },
    });
    const downvote = await MemberVote.count({
      where: { answer_id: id, vote_type: 'downvote' },
    });
    const voteCount = upvote - downvote;
    const flagCount = await AnswerFlag.count({
      where: { answer_id: id },
    });
    return [voteCount, flagCount];
  } catch (error) {
    throw error;
  }
};

const vote = async (id, member_id, type) => {
  try {
    const vote = await MemberVote.findOne({
      where: { answer_id: id, member_id: member_id },
    });
    if (vote) {
      if (vote.vote_type !== type) {
        await vote.update({ vote_type: type });
      }
    } else {
      await MemberVote.create({
        answer_id: id,
        member_id: member_id,
        vote_type: type,
        related_type: 'answer'
      });
    }
  } catch (error) {
    throw error;
  }
}

const downvote = async (id, member_id) => {
  
}

module.exports =  {
	getAllAnswers,
  getAnswerById,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  vote
}