const { Question, Tag, QuestionTag, MemberView, MemberVote } = require('@models/_index');
const createResData = require('@utils/resMaker');

const getAllQuestions = async () => {
  try {
    const questions = await Question.findAll();
    const questionsWithTags = await Promise.all(
      questions.map((question) => {
        question.tags = getQuestionTagById(question.id);
        [question.viewCount, question.voteCount, question.flagCount] =
          getViewVoteFlagById(question.id);
        return question;
      })
    );
    return createResData(200, questionsWithTags);
  } catch (error) {
    return createResData(500, { error: error.message });
  }
};

const getQuestionById = async (id) => {
  try {
    const question = await Question.findByPk(id);
    if (question) {
      question.tags = await getQuestionTagById(question.id);
      [question.viewCount, question.voteCount, question.flagCount] =
        getViewVoteFlagById(question.id);
      return createResData(200, question);
    } else {
      return createResData(404, { message: 'Question not found' });
    }
  } catch (error) {
    throw error;
  }
};

const createQuestion = async (member_id, title, question_text, tags) => {
  try {
    const newQuestion = await Question.create({
      member_id,
      title,
      question_text,
    });
    if (tags && tags.length > 0) {
      await Promise.all(
        tags.map(async (tag) => {
          await QuestionTag.create({
            question_id: newQuestion.id,
            tag_id: tag.id,
          });
        })
      );
    }
    return createResData(201, getQuestionById(newQuestion.id).data);
  } catch (error) {
    return createResData(500, { error: error.message });
  }
};

const updateQuestion = async (id, title, question_text, tags, status, closing_remark) => {
  try {
		const question = await Question.findByPk(id)
		if (!question) {
      return createResData(404, { message: 'Question not found' });
    }
    await question.update({
      title,
      question_text,
			status,
      closing_remark,
			update_time: new Date()
    });
    await updateQuestionTags(id, tags);
    return createResData(201, getQuestionById(id).data);
  } catch (error) {
    return createResData(500, { error: error.message });
  }
};

// CHỈ SỬ DỤNG HÀM NÀY KHI CHẮC CHẮN CÓ THỂ XÓA MÀ KHÔNG ẢNH HƯỞNG ĐẾN BẢNG KHÁC!!!
const deleteQuestion = async (id) => {
	try {
    const deleted = await Question.destroy({ where: { id: id } });
    if (deleted) {
			return createResData(204, 'Question deleted')
    } else {
			return createResData(404, 'Question not found')
    }
  } catch (error) {
		return createResData(500, { error: error.message })
  }
}

const getQuestionTagById = async (id) => {
  try {
    const questionTags = await QuestionTag.findAll({
      where: { question_id: id },
      include: [{ model: Tag }],
      attributes: [],
    });
    return questionTags;
  } catch (error) {
    throw error;
  }
};

const getViewVoteFlagById = async (id) => {
  try {
    const viewCount = await MemberView.count({
      where: { question_id: id },
    });
    const upvote = await MemberVote.count({
      where: { question_id: id, vote_type: 'upvote' },
    });
    const downvote = await MemberVote.count({
      where: { question_id: id, vote_type: 'downvote' },
    });
    const voteCount = upvote - downvote;
    const flagCount = await MemberView.count({
      where: { question_id: id, flagged: true },
    });
    return [viewCount, voteCount, flagCount];
  } catch (error) {
    throw error;
  }
};

const updateQuestionTags = async (question_id, tags) => {
	try {
		await QuestionTag.destroy({where: { question_id: question_id }});
		await Promise.all(
			tags.forEach(tag => {
				QuestionTag.create({
					question_id,
          tag_id: tag.id,
				});
			})
		)
	} catch (error) {
		throw error;
	}
}

const vote = async (id, member_id, type) => {
  try {
    const vote = await MemberVote.findOne({
      where: { question_id: id, member_id: member_id },
    });
    if (vote) {
      if (vote.vote_type !== type) {
        await vote.update({ vote_type: type });
      }
    } else {
      await MemberVote.create({
        question_id: id,
        member_id: member_id,
        vote_type: type,
        related_type: 'answer'
      });
    }
  } catch (error) {
    throw error;
  }
}

module.exports =  {
	getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  vote
}