const createError = require('http-errors')
const { Subject, Sequelize } = require('~/models')

const createSubject = async (req, res, next) => {
    try {
        const subjectData = req.body

        const subject = await Subject.findOne({
            where: Sequelize.where(
                Sequelize.fn('lower', Sequelize.col('subjectName')),
                Sequelize.fn('lower', subjectData.subjectName)
            )
        })
        if (subject) return next(createError(409))

        const newSubject = await Subject.create({
            ...subjectData
        })

        return res.json({
            data: newSubject.toJSON()
        })
    } catch (error) {
        return next(createError(500))
    }
}

const getAllSubjects = async (req, res, next) => {
    try {
        const subjects = await Subject.findAll()

        return res.json({
            data: subjects
        })
    } catch (error) {
        return next(createError(500))
    }
}

const getSubjectById = async (req, res, next) => {
    try {
        const { id } = req.params
        const subject = await Subject.findByPk(id)

        if (!subject) {
            return next(createError(404))
        }

        return res.json({
            data: subject
        })
    } catch (error) {
        return next(createError(500))
    }
}

const updateSubject = async (req, res, next) => {
    try {
        const { id } = req.params
        let subject = await Subject.findByPk(id)

        if (!subject) {
            return next(createError(404))
        }
        subject = await subject.update({ ...req.body })

        return res.json({ data: subject })
    } catch (error) {
        return next(createError(500))
    }
}

const deleteSubject = async (req, res, next) => {
    try {
        const { id } = req.params
        const subject = await Subject.findByPk(id)

        if (!subject) {
            return next(createError(404))
        }

        await subject.destroy()

        return res.json({ success: true, data: subject })
    } catch (error) {
        return next(createError(500))
    }
}
module.exports = {
    createSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject
}
