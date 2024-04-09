const router = require('express').Router()
const teacherController = require('~/controllers/teacher.controller')

router.post('/', teacherController.createTeacher)
router.get('/', teacherController.getAllTeachers)
router.get('/:id', teacherController.getTeacherById)
router.put('/:id', teacherController.updateTeacher)
router.delete('/:id', teacherController.deleteTeacher)
router.get('/:teacherId/question-banks', teacherController.getQuestionBanksByTeacherId)
router.get('/:teacherId/examinations', teacherController.getExaminationsByTeacherId)

module.exports = router
