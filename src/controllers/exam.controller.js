const createError = require('http-errors')
const { Exam, Question, Sequelize, Examination, QuestionBank, ShuffledQuestion } = require('~/models')

function shuffleAnswers(answers) {
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[answers[i], answers[j]] = [answers[j], answers[i]]
    }
    return answers
}

const createExam = async (req, res, next) => {
    try {
        const { examinationId, studentId } = req.body

        const exam = await Exam.findOne({
            where: {
                studentId,
                examinationId
            },
            include: [
                {
                    association: 'examination',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: 'subject'
                }
            ]
        })

        if (exam) {
            return res.json({ data: exam })
        }

        const examination = await Examination.findByPk(examinationId)
        const questionBank = await QuestionBank.findOne({
            where: {
                subjectId: examination.subjectId,
                teacherId: examination.teacherId
            }
        })

        const questions = await Question.findAll({
            where: { questionBankId: questionBank.id },
            order: Sequelize.literal('rand()'),
            limit: 10,
            attributes: { exclude: ['createdAt', 'updatedAt', 'difficulty'] },
            include: [
                {
                    association: 'answers',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'questionId', 'isCorrect']
                    }
                }
            ]
        })

        const questionOrder = questions.map((question) => question.id)
        const examData = {
            studentId,
            examinationId,
            questionOrder
        }

        const newExam = await Exam.create(examData)
        newExam.setDataValue('duration', examination.duration)

        for (const question of questions) {
            const shuffledAnswers = shuffleAnswers(question.answers)

            await ShuffledQuestion.create({
                examId: newExam.id,
                questionId: question.id,
                shuffledAnswerIds: shuffledAnswers.map((answer) => answer.id)
            })
        }

        return res.json({
            data: {
                ...newExam.toJSON(),
                questions
            }
        })
    } catch (error) {
        return next(createError(500))
    }
}

module.exports = {
    createExam
}
