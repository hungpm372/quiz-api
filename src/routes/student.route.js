const router = require('express').Router()
const studentController = require('~/controllers/student.controller')

router.post('/', studentController.createStudent)
router.get('/', studentController.getAllStudents)
router.get('/:id', studentController.getStudentById)
router.put('/:id', studentController.updateStudent)
router.delete('/:id', studentController.deleteStudent)

module.exports = router
