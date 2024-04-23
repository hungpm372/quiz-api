const router = require('express').Router()
const adminController = require('~/controllers/admin.controller')
const { isAdmin } = require('~/middlewares/auth.middleware')

router.post('/', isAdmin, adminController.createAdmin)
router.get('/users', adminController.getAddUser)

module.exports = router
