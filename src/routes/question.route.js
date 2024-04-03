const router = require('express').Router()
const questionController = require('~/controllers/question.controller')

router.post('/', questionController.createQuestion)
router.get('/', questionController.getAllQuestions)
router.get('/:id', questionController.getQuestionById)
// router.put('/:id', questionController.updateStudent)
router.delete('/:id', questionController.deleteQuestion)

module.exports = router
