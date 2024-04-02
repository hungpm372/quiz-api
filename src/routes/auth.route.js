const router = require('express').Router()
const authController = require('~/controllers/auth.controller')

router.post('/sign-in', authController.signIn)
router.post('/sign-up', authController.signUp)
router.get('/sign-out', authController.signOut)

module.exports = router
