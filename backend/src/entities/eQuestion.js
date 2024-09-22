const { Question, Tag, QuestionTag, MemberView, MemberVote, MemberFlag } = require('@models/_index');
const createResData = require('@utils/resMaker');

const getAllQuestions = async () => {
  try {
    const questions = await Question.findAll({
      include: {
        model: Tag,
        attributes: ['id', 'name', 'description'],
        required: false,
      }}
    );
    const questionsWithTags = await Promise.all( 
      questions.map(async (question) => {
        const countedValue = await getViewVoteFlagById(question.dataValues.id)
        question.dataValues.viewCount = countedValue.viewCount
        question.dataValues.voteCount = countedValue.voteCount
        question.dataValues.flagCount = countedValue.flagCount
        return question;
      })
    );
    return createResData(200, questionsWithTags);
  } catch (error) {
    return createResData(500, error);
  }
};

const getQuestionById = async (id) => {
  try {
    const question = await Question.findByPk(id, {
      include: {
        model: Tag,
        attributes: ['id', 'name', 'description'],
        required: false,
      }});
    if (question) {
      const countedValue = await getViewVoteFlagById(question.dataValues.id)
      question.dataValues.viewCount = countedValue.viewCount
      question.dataValues.voteCount = countedValue.voteCount
      question.dataValues.flagCount = countedValue.flagCount      
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
            question_id: newQuestion.dataValues.id,
            tag_id: tag.id,
          });
        })
      );
    }
    return createResData(201, (await getQuestionById(newQuestion.dataValues.id)).data);
  } catch (error) {
    return createResData(500, error);
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
    return createResData(201, (await getQuestionById(id)).data);
  } catch (error) {
    return createResData(500, error);
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
		return createResData(500, error)
  }
}

const getQuestionByTag = async (tag_id) => {
  try {
    const questions = await Question.findAll({
      include: {
        model: Tag,
        where: { id: tag_id },
        attributes: ['id', 'name', 'description'],
        required: false,
      }}
    );
    const questionsWithTags = await Promise.all( 
      questions.map(async (question) => {
        const countedValue = await getViewVoteFlagById(question.dataValues.id)
        question.dataValues.viewCount = countedValue.viewCount
        question.dataValues.voteCount = countedValue.voteCount
        question.dataValues.flagCount = countedValue.flagCount
        return question;
      })
    );
    return createResData(200, questionsWithTags);
  } catch (error) {
    return createResData(500, error);
  }
}

const getQuestionByMember = async (member_id) => {
  try {
    const questions = await Question.findAll({
      where: { member_id },
      include: {
        model: Tag,
        attributes: ['id', 'name', 'description'],
        required: false,
      }}
    );
    const questionsWithTags = await Promise.all( 
      questions.map(async (question) => {
        const countedValue = await getViewVoteFlagById(question.dataValues.id)
        question.dataValues.viewCount = countedValue.viewCount
        question.dataValues.voteCount = countedValue.voteCount
        question.dataValues.flagCount = countedValue.flagCount
        return question;
      })
    );
    return createResData(200, questionsWithTags);
  } catch (error) {
    return createResData(500, error);
  }
}

const getViewVoteFlagById = async (id) => {
  try {
    const [viewCount, upvote, downvote, flagCount] = await Promise.all([
      MemberView.count({ where: { question_id: id } }),
      MemberVote.count({ where: { question_id: id, vote_type: 'Upvote' } }),
      MemberVote.count({ where: { question_id: id, vote_type: 'Downvote' } }),
      MemberFlag.count({ where: { question_id: id } }),
    ]);

    const voteCount = upvote - downvote;
    return { viewCount, voteCount, flagCount };
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

module.exports =  {
	getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionByTag,
  getQuestionByMember,
  updateQuestionTags,
}