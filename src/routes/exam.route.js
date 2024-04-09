const router = require('express').Router()
const examController = require('~/controllers/exam.controller')

router.post('/', examController.createExam)

module.exports = router
