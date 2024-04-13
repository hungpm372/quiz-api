const router = require('express').Router()
const teacherController = require('~/controllers/teacher.controller')
const { isAdmin, isTeacher } = require('~/middlewares/auth.middleware')

router.post('/', isAdmin, teacherController.createTeacher)
router.get('/', isAdmin, teacherController.getAllTeachers)
router.get('/:id', teacherController.getTeacherById)
router.put('/:id', teacherController.updateTeacher)
router.delete('/:id', isAdmin, teacherController.deleteTeacher)
router.get('/:teacherId/question-banks', isTeacher, teacherController.getQuestionBanksByTeacherId)
router.get('/:teacherId/examinations', isTeacher, teacherController.getExaminationsByTeacherId)

module.exports = router
