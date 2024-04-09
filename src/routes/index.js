const router = require('express').Router()
const authRouter = require('./auth.route')
const adminRouter = require('./admin.route')
const teacherRouter = require('./teacher.route')
const studentRouter = require('./student.route')
const subjectRouter = require('./subject.route')
const questionBankRouter = require('./questionBank.route')
const questionRouter = require('./question.route')
const examinationRouter = require('./examination.route')
const examRouter = require('./exam.route')
const testRouter = require('./test.route')

router.use('/auth', authRouter)
router.use('/admins', adminRouter)
router.use('/teachers', teacherRouter)
router.use('/students', studentRouter)
router.use('/subjects', subjectRouter)
router.use('/question-banks', questionBankRouter)
router.use('/questions', questionRouter)
router.use('/examinations', examinationRouter)
router.use('/exams', examRouter)
router.use('/tests', testRouter)

module.exports = router
