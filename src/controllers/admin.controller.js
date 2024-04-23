const { Admin, Student, Teacher } = require('~/models')
const bcrypt = require('bcrypt')
const createError = require('http-errors')

const getAddUser = async (req, res, next) => {
    try {
        const admins = await Admin.findAll()
        const teachers = await Teacher.findAll()
        const students = await Student.findAll()

        return res.json({
            data: [...admins, ...teachers, ...students]
        })
    } catch (error) {
        return next(error)
    }
}

const createAdmin = async (req, res, next) => {
    try {
        const userData = req.body

        const user = await Admin.findOne({ where: { email: userData.email } })
        if (user) return next(createError(409))

        userData.adminCode = `AD${new Date().getTime()}`
        userData.role = 'ad'
        const salt = bcrypt.genSaltSync(10)
        userData.password = bcrypt.hashSync(userData.password, salt)

        const admin = await Admin.create({
            ...userData
        })

        return res.json({
            data: admin.toJSON()
        })
    } catch (error) {
        return next(createError(500))
    }
}

module.exports = {
    getAddUser,
    createAdmin
}
