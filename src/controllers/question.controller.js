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

const getAllQuestions = async (req, res, next) => {
    try {
        const questions = await Question.findAll({ include: 'answers' })

        return res.json({ data: questions })
    } catch (error) {
        return next(createError(500))
    }
}

const getQuestionById = async (req, res, next) => {
    try {
        const { id } = req.params

        const question = await Question.findByPk(id, { include: 'answers' })

        if (!question) {
            return res.json(createError(404))
        }

        return res.json({ data: question })
    } catch (error) {
        return next(createError(500))
    }
}

const deleteQuestion = async (req, res, next) => {
    try {
        const { id } = req.params

        const question = await Question.findByPk(id)
        if (!question) {
            return res.json(createError(404))
        }

        await question.destroy()

        return res.json({ success: true, data: question })
    } catch (error) {
        return next(createError(500))
    }
}

module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    deleteQuestion
}
