const bcrypt = require('bcrypt')
const createError = require('http-errors')
const { Student, Examination, Sequelize } = require('~/models')

const createStudent = async (req, res, next) => {
    try {
        const userData = req.body

        const user = await Student.findOne({ where: { email: userData.email } })
        if (user) return next(createError(409))

        userData.studentCode = `SV${new Date().getTime()}`
        userData.role = 'st'
        const salt = bcrypt.genSaltSync(10)
        userData.password = bcrypt.hashSync('12345', salt)

        const student = await Student.create({
            ...userData
        })

        return res.json({
            data: student.toJSON()
        })
    } catch (error) {
        return next(createError(500))
    }
}

const getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.findAll({ attributes: { exclude: ['password'] } })
        return res.json({ data: students })
    } catch (error) {
        return next(createError(500))
    }
}

const getStudentById = async (req, res, next) => {
    try {
        const student = await Student.findByPk(req.params.id, { attributes: { exclude: ['password'] } })
        if (!student) {
            return next(createError(404))
        }

        return res.json({ data: student })
    } catch (error) {
        return next(createError(500))
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const { name, age, grade } = req.body
        const student = await Student.findByIdAndUpdate(req.params.id, { name, age, grade }, { new: true })
        if (!student) {
            return res.status(404).json({ success: false, message: 'Sinh viên không tồn tại' })
        }
        res.status(200).json({ success: true, data: student })
    } catch (error) {
        return next(createError(500))
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findByPk(req.params.id)

        if (!student) {
            return next(createError(404))
        }

        await student.destroy()

        return res.json({ success: true, data: student })
    } catch (error) {
        return next(createError(500))
    }
}

const getExaminationsByStudentClass = async (req, res, next) => {
    const { classs } = req.params
    console.log(classs)
    try {
        const examinations = await Examination.findAll({
            where: {
                classs,
                endDate: {
                    [Sequelize.Op.gt]: new Date()
                }
            },
            include: [
                {
                    association: 'subject',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'credits', 'theoryHours', 'practiceHours', 'status', 'id']
                    }
                }
            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })

        return res.json({ data: examinations })
    } catch (error) {
        return next(createError(500))
    }
}

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    getExaminationsByStudentClass
}
