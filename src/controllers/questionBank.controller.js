const createError = require('http-errors')
const { QuestionBank } = require('~/models')

const createQuestionBank = async (req, res, next) => {
    try {
        const questionBankData = req.body

        questionBankData.questionBankCode = `QB${new Date().getTime()}`

        const questionBank = await QuestionBank.create({
            ...questionBankData
        })

        return res.json({
            data: questionBank.toJSON()
        })
    } catch (error) {
        return next(createError(500))
    }
}

const getAllQuestionBanks = async (req, res, next) => {
    try {
        const questionBanks = await QuestionBank.findAll()

        return res.json({ data: questionBanks })
    } catch (error) {
        return next(createError(500))
    }
}

const getQuestionBankById = async (req, res, next) => {
    const { id } = req.params
    try {
        const questionBank = await QuestionBank.findByPk(id)

        if (!questionBank) {
            return next(createError(404))
        }

        return res.json({ data: questionBank })
    } catch (error) {
        return next(createError(500))
    }
}

const updateQuestionBank = async (req, res, next) => {
    const { id } = req.params
    const newData = req.body

    try {
        let questionBank = await QuestionBank.findByPk(id)

        if (!questionBank) {
            return next(createError(404))
        }

        questionBank = await questionBank.update(newData)

        return res.json({ data: questionBank })
    } catch (error) {
        return next(createError(500))
    }
}

const deleteQuestionBank = async (req, res, next) => {
    const { id } = req.params
    try {
        const questionBank = await QuestionBank.findByPk(id)

        if (!questionBank) {
            return next(createError(404))
        }

        await questionBank.destroy()

        return res.json({ success: true, data: questionBank })
    } catch (error) {
        return next(createError(500))
    }
}

module.exports = {
    createQuestionBank,
    getAllQuestionBanks,
    getQuestionBankById,
    updateQuestionBank,
    deleteQuestionBank
}
