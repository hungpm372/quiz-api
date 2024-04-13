const router = require('express').Router()
const studentController = require('~/controllers/student.controller')
const { isAdmin } = require('~/middlewares/auth.middleware')

router.post('/', isAdmin, studentController.createStudent)
router.get('/', studentController.getAllStudents)
router.get('/:id', studentController.getStudentById)
router.put('/:id', studentController.updateStudent)
router.delete('/:id', studentController.deleteStudent)
router.get('/:classs/examinations', studentController.getExaminationsByStudentClass)
router.get('/:id/exams', studentController.getExamsByStudentId)

module.exports = router
