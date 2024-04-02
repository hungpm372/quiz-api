const bcrypt = require('bcrypt')
const createError = require('http-errors')
const { Teacher } = require('~/models')

const createTeacher = async (req, res, next) => {
    try {
        const userData = req.body

        const user = await Teacher.findOne({ where: { email: userData.email } })
        if (user) return next(createError(409))

        userData.teacherCode = `GV${new Date().getTime()}`
        userData.role = 'tc'
        const salt = bcrypt.genSaltSync(10)
        userData.password = bcrypt.hashSync('12345', salt)

        const teacher = await Teacher.create({
            ...userData
        })

        return res.json({
            data: teacher.toJSON()
        })
    } catch (error) {
        return next(createError(500))
    }
}

const getAllTeachers = async (req, res, next) => {
    try {
        const teachers = await Teacher.findAll({ attributes: { exclude: ['password'] } })
        return res.json({ data: teachers })
    } catch (error) {
        return next(createError(500))
    }
}

const getTeacherById = async (req, res, next) => {
    try {
        const teacher = await Teacher.findByPk(req.params.id, { attributes: { exclude: ['password'] } })
        if (!teacher) {
            return next(createError(404))
        }

        return res.json({ data: teacher })
    } catch (error) {
        return next(createError(500))
    }
}

const updateTeacher = async (req, res, next) => {
    try {
        const { name, age, grade } = req.body
        const student = await Teacher.findByIdAndUpdate(req.params.id, { name, age, grade }, { new: true })
        if (!student) {
            return res.status(404).json({ success: false, message: 'Giảng viên không tồn tại' })
        }
        res.status(200).json({ success: true, data: student })
    } catch (error) {
        return next(createError(500))
    }
}

const deleteTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.findByPk(req.params.id)

        if (!teacher) {
            return next(createError(404))
        }

        await teacher.destroy()

        return res.json({ success: true, data: teacher })
    } catch (error) {
        return next(createError(500))
    }
}

module.exports = {
    createTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
}
