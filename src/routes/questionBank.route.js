const router = require('express').Router()
const questionBankController = require('~/controllers/questionBank.controller')
const { isTeacher } = require('~/middlewares/auth.middleware')

router.post('/', isTeacher, questionBankController.createQuestionBank)
router.get('/', questionBankController.getAllQuestionBanks)
router.get('/:id', questionBankController.getQuestionBankById)
router.put('/:id', questionBankController.updateQuestionBank)
router.delete('/:id', isTeacher, questionBankController.deleteQuestionBank)
router.get('/:questionBankId/questions', questionBankController.getQuestionsByQuestionBankId)

module.exports = router
