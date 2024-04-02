const jwt = require('jsonwebtoken')

const generateToken = (user, secret, expiresIn) => {
    const payload = {
        userId: user.id,
        role: user.role
    }
    return jwt.sign(payload, secret, { expiresIn })
}

const generateAuthTokens = (user) => {
    const accessToken = generateToken(user, process.env.ACCESS_TOKEN_SECRET, '1d')
    const refreshToken = generateToken(user, process.env.REFRESH_TOKEN_SECRET, '365d')

    return {
        accessToken,
        refreshToken
    }
}

module.exports = {
    generateToken,
    generateAuthTokens
}
