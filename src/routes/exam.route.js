const router = require('express').Router()
const examController = require('~/controllers/exam.controller')

router.post('/', examController.createExam)
router.get('/:id', examController.getExamById)
router.post('/:id/submit', examController.submitExam)

module.exports = router
