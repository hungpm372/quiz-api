const router = require('express').Router()
const studentController = require('~/controllers/student.controller')

router.post('/', studentController.createStudent)
router.get('/', studentController.getAllStudents)
router.get('/:id', studentController.getStudentById)
router.put('/:id', studentController.updateStudent)
router.delete('/:id', studentController.deleteStudent)
router.get('/:classs/examinations', studentController.getExaminationsByStudentClass)
router.get('/:id/exams', studentController.getExamsByStudentId)

module.exports = router
