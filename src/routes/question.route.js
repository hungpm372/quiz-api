const router = require('express').Router()
const questionController = require('~/controllers/question.controller')
const { isTeacher } = require('~/middlewares/auth.middleware')

router.post('/', /*isTeacher,*/ questionController.createQuestion)
router.get('/', questionController.getAllQuestions)
router.get('/:id', questionController.getQuestionById)
router.delete('/:id', isTeacher, questionController.deleteQuestion)

module.exports = router
