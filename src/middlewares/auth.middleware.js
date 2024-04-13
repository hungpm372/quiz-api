const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) return next(createError(401))

        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = user

        return next()
    } catch (error) {
        return next(createError(401))
    }
}

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'ad') {
        return next()
    }
    return next(createError(403))
}

const isTeacher = (req, res, next) => {
    if (req.user && req.user.role === 'tc') {
        return next()
    }
    return next(createError(403))
}

const isStudent = (req, res, next) => {
    if (req.user && req.user.role === 'st') {
        return next()
    }
    return next(createError(403))
}

module.exports = {
    verifyToken,
    isAdmin,
    isTeacher,
    isStudent
}
