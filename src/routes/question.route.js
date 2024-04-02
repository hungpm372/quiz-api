const router = require('express').Router()
const questionController = require('~/controllers/question.controller')

router.post('/', questionController.createQuestion)
// router.get('/', questionController.getAllStudents)
// router.get('/:id', questionController.getStudentById)
// router.put('/:id', questionController.updateStudent)
// router.delete('/:id', questionController.deleteStudent)

module.exports = router
