const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) return next(createError(401))

        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = user

        return next()
    } catch (error) {
        return next(createError(401))
    }
}

module.exports = {
    verifyToken
}
