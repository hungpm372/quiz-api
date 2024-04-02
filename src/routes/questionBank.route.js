const router = require('express').Router()
const questionBankController = require('~/controllers/questionBank.controller')

router.post('/', questionBankController.createQuestionBank)
router.get('/', questionBankController.getAllQuestionBanks)
router.get('/:id', questionBankController.getQuestionBankById)
// router.put('/:id', questionBankController.updateQuestionBank)
router.delete('/:id', questionBankController.deleteQuestionBank)

module.exports = router
