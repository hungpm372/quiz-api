const createError = require('http-errors')
const { Question, Answer } = require('~/models')

const createQuestion = async (req, res, next) => {
    try {
        const { content, difficulty, questionBankId, answers } = req.body

        const question = await Question.create({ content, difficulty, questionBankId })

        const createdAnswers = await Promise.all(
            answers.map((answer) => {
                return Answer.create({
                    answerContent: answer.answerContent,
                    isCorrect: answer.isCorrect,
                    questionId: question.id
                })
            })
        )

        return res.json({
            data: {
                ...question.toJSON(),
                answers: createdAnswers
            }
        })
    } catch (error) {
        return next(createError(500))
    }
}

module.exports = {
    createQuestion
}
