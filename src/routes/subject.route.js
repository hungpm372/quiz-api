const router = require('express').Router()
const subjectController = require('~/controllers/subject.controller')

router.post('/', subjectController.createSubject)
router.get('/', subjectController.getAllSubjects)
router.get('/:id', subjectController.getSubjectById)
router.put('/:id', subjectController.updateSubject)
router.delete('/:id', subjectController.deleteSubject)

module.exports = router
