const { Answer, MemberVote, MemberFlag, Question } = require('@models/_index')
const createResData = require('@utils/resMaker')

const getAllAnswers = async () => {
  try {
    const answers = await Answer.findAll()
    const answersWithVotes = await Promise.all(
      answers.map(async (answer) => {
        const [voteCount, flagCount] = await getVoteFlagById(answer.dataValues.id)

        // Kiểm tra nếu answer_text bắt đầu bằng $
        answer.dataValues.answer_text = answer.dataValues.answer_text.startsWith('$')
          ? '[HIDDEN ANSWER]'
          : answer.dataValues.answer_text

        answer.dataValues.voteCount = voteCount
        answer.dataValues.flagCount = flagCount

        return answer
      })
    )
    return createResData(200, answersWithVotes)
  } catch (error) {
    return createResData(500, error)
  }
}

const getAnswerById = async (id) => {
  try {
    const answer = await Answer.findByPk(id)
    if (answer) {
      const [voteCount, flagCount] = await getVoteFlagById(answer.dataValues.id)

      // Kiểm tra nếu answer_text bắt đầu bằng $
      answer.dataValues.answer_text = answer.dataValues.answer_text.startsWith('$')
        ? '[HIDDEN ANSWER]'
        : answer.dataValues.answer_text

      answer.dataValues.voteCount = voteCount
      answer.dataValues.flagCount = flagCount
      return createResData(200, answer)
    } else {
      return createResData(404, { message: 'Answer not found' })
    }
  } catch (error) {
    throw error
  }
}

const createAnswer = async (question_id, member_id, answer_text) => {
  try {
    const newAnswer = await Answer.create({
      question_id,
      member_id,
      answer_text
    })
    return createResData(201, (await getAnswerById(newAnswer.dataValues.id)).data)
  } catch (error) {
    return createResData(500, error)
  }
}

const updateAnswer = async (id, answer_text, accepted) => {
  try {
    const answer = await Answer.findByPk(id)
    if (!answer) {
      return createResData(404, { message: 'Answer not found' })
    }
    await answer.update({
      answer_text,
      accepted
    })
    return createResData(201, (await getAnswerById(id)).data)
  } catch (error) {
    return createResData(500, error)
  }
}

// CHỈ SỬ DỤNG HÀM NÀY KHI CHẮC CHẮN CÓ THỂ XÓA MÀ KHÔNG ẢNH HƯỞNG ĐẾN BẢNG KHÁC!!!
const deleteAnswer = async (id) => {
  try {
    const deleted = await Answer.destroy({ where: { id: id } })
    if (deleted) {
      return createResData(204, { message: 'Answer deleted' })
    } else {
      return createResData(404, { message: 'Answer not found' })
    }
  } catch (error) {
    return createResData(500, error)
  }
}

const getVoteFlagById = async (id) => {
  try {
    const [upvote, downvote, flagCount] = await Promise.all([
      MemberVote.count({ where: { answer_id: id, vote_type: 'Upvote' } }),
      MemberVote.count({ where: { answer_id: id, vote_type: 'Downvote' } }),
      MemberFlag.count({ where: { answer_id: id } })
    ])

    const voteCount = upvote - downvote
    return [voteCount, flagCount]
  } catch (error) {
    throw error
  }
}

const getAnswerByQuestion = async (question_id) => {
  try {
    const answers = await Answer.findAll({ where: { question_id } })
    const answersWithVotes = await Promise.all(
      answers.map(async (answer) => {
        const [voteCount, flagCount] = await getVoteFlagById(answer.dataValues.id)

        // Kiểm tra nếu answer_text bắt đầu bằng $
        answer.dataValues.answer_text = answer.dataValues.answer_text.startsWith('$')
          ? '[HIDDEN ANSWER]'
          : answer.dataValues.answer_text

        answer.dataValues.voteCount = voteCount
        answer.dataValues.flagCount = flagCount

        return answer
      })
    )
    return createResData(200, answersWithVotes)
  } catch (error) {
    return createResData(500, error)
  }
}

const setCorrectAnswer = async (id, accepter_id) => {
  try {
    const answer = await Answer.findByPk(id)
    if (!answer) {
      return createResData(404, { message: 'Answer not found' })
    }

    const question_id = answer.dataValues.question_id

    const questionCount = await Question.count({
      where: { id: question_id, member_id: accepter_id }
    })

    if (questionCount === 0) {
      return createResData(403, { message: 'Current member has no permission to accept answer' })
    }

    const acceptedAnswer = await Answer.findOne({
      where: { question_id: question_id, accepted: true }
    })

    if (acceptedAnswer) {
      return createResData(502, { message: 'Question already has a correct answer' })
    }

    await answer.update({ accepted: true })
    return createResData(200, { message: 'Correct answer updated' })
  } catch (error) {
    return createResData(500, error)
  }
}

const hideAnswer = async (id) => {
  try {
    const answer = await Answer.findByPk(id)
    if (!answer) {
      return createResData(404, { message: 'Answer not found' })
    }
    // Thêm ký tự `$` để đánh dấu ẩn câu trả lời
    await answer.update({ answer_text: `$${answer.dataValues.answer_text}` })
    return createResData(200, { ...answer.dataValues, answer_text: 'Answer is hidden' })
  } catch (error) {
    return createResData(500, error)
  }
}

const showAnswer = async (id) => {
  try {
    const answer = await Answer.findByPk(id)
    if (!answer) {
      return createResData(404, { message: 'Answer not found' })
    }
    if (answer.dataValues.answer_text.startsWith('$')) {
      // Bỏ ký tự `$` để hiển thị lại câu trả lời
      await answer.update({ answer_text: answer.dataValues.answer_text.slice(1) })
    }
    return createResData(200, { ...answer.dataValues, answer_text: answer.dataValues.answer_text.slice(1) })
  } catch (error) {
    return createResData(500, error)
  }
}

module.exports = {
  getAllAnswers,
  getAnswerById,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  getAnswerByQuestion,
  setCorrectAnswer,
  showAnswer,
  hideAnswer
}
