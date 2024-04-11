const { Sequelize, Question } = require('~/models')
const answer = require('~/models/answer')

const router = require('express').Router()

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

router.get('/', async (req, res) => {
    // const questions = await Question.findAll({
    //     where: { questionBankId: 3 },
    //     order: Sequelize.literal('rand()'),
    //     limit: 2,
    //     attributes: { exclude: ['createdAt', 'updatedAt', 'difficulty'] },
    //     include: [
    //         {
    //             association: 'answers',
    //             attributes: {
    //                 exclude: ['createdAt', 'updatedAt', 'questionId']
    //             }
    //         }
    //     ]
    // })

    // questions.forEach((question) => {
    //     question.answers = shuffleArray(question.answers)
    //     const ids = question.answers.map((answer) => answer.id)
    //     console.log(ids)
    // })
    const questions = await Question.findOne()
    questions.setDataValue('name', 'Lincoln')
    return res.json(questions)
})

module.exports = router
