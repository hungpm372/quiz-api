const router = require('express').Router()
const examinationController = require('~/controllers/examination.controller')

router.post('/', examinationController.createExamination)
// router.get('/', examinationController.getAllQuestions)
// router.get('/:id', examinationController.getQuestionById)
// router.put('/:id', questionController.updateStudent)
// router.delete('/:id', examinationController.deleteQuestion)

module.exports = router
