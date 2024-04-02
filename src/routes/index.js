const router = require('express').Router()
const authRouter = require('./auth.route')
const adminRouter = require('./admin.route')
const teacherRouter = require('./teacher.route')
const studentRouter = require('./student.route')

router.use('/auth', authRouter)
router.use('/admins', adminRouter)
router.use('/teachers', teacherRouter)
router.use('/students', studentRouter)

module.exports = router
