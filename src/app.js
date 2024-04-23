/* eslint-disable no-unused-vars */
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const createError = require('http-errors')

const appRouter = require('~/routes')
const delayMiddleware = require('./middlewares/delay.middleware')

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(compression())
app.use(delayMiddleware())

app.use('/api', appRouter)

app.use((req, res, next) => {
    next(createError(404))
})

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = status !== 500 && err.message

    return res.status(status).json({
        status,
        message
    })
})

module.exports = app
