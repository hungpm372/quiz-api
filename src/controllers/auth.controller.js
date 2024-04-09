const bcrypt = require('bcrypt')
const createError = require('http-errors')
const { Admin, Student, Teacher } = require('~/models')
const { generateAuthTokens } = require('~/utils/token')

const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        let user = await Admin.findOne({ where: { email } })

        if (!user) user = await Teacher.findOne({ where: { email } })
        if (!user) user = await Student.findOne({ where: { email } })

        if (!user) return next(createError(404))

        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) return next(createError(401))

        const userRes = user.toJSON()
        delete userRes.password

        const tokens = generateAuthTokens(userRes)

        return res.json({
            data: userRes,
            ...tokens
        })
    } catch (error) {
        return next(error)
    }
}

const signUp = async (req, res) => {
    const { password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)
    const admin = await Admin.create({
        adminCode: 'AD12345',
        role: 'ad',
        ...req.body,
        firstName: 'Hung',
        lastName: 'Phan Minh',
        password: hashPassword
    })
    return res.json(admin.toJSON())
}

const signOut = (req, res) => {
    return res.json(req.body)
}

module.exports = {
    signIn,
    signUp,
    signOut
}
