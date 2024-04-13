const router = require('express').Router()
const subjectController = require('~/controllers/subject.controller')
const { isAdmin } = require('~/middlewares/auth.middleware')

router.post('/', isAdmin, subjectController.createSubject)
router.get('/', subjectController.getAllSubjects)
router.get('/:id', subjectController.getSubjectById)
router.put('/:id', isAdmin, subjectController.updateSubject)
router.delete('/:id', isAdmin, subjectController.deleteSubject)

module.exports = router
