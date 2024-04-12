const createError = require('http-errors')
const { Op } = require('sequelize')
const { Exam, Question, Sequelize, Examination, QuestionBank, ShuffledQuestion, Answer } = require('~/models')

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
                    include: [
                        {
                            association: 'subject',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt', 'credits', 'theoryHours', 'practiceHours']
                            }
                        }
                    ]
                }
            ]
        })

        if (exam) {
            return res.json({ data: exam })
        }

        const examination = await Examination.findByPk(examinationId, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                {
                    association: 'subject',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'credits', 'theoryHours', 'practiceHours']
                    }
                }
            ]
        })
        const questionBank = await QuestionBank.findOne({
            where: {
                subjectId: examination.subjectId,
                teacherId: examination.teacherId
            }
        })

        const questions = await Question.findAll({
            where: { questionBankId: questionBank.id },
            order: Sequelize.literal('rand()'),
            limit: examination.duration,
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

        const examData = {
            studentId,
            examinationId
        }

        const newExam = await Exam.create(examData)
        newExam.setDataValue('examination', examination)

        for (const question of questions) {
            const shuffledAnswers = shuffleAnswers(question.answers)

            await ShuffledQuestion.create({
                examId: newExam.id,
                questionId: question.id,
                shuffledAnswerIds: shuffledAnswers.map((answer) => answer.id)
            })
        }

        return res.json({
            data: newExam.toJSON()
        })
    } catch (error) {
        return next(createError(500))
    }
}

const getExamById = async (req, res, next) => {
    try {
        const { id: examId } = req.params

        const exam = await Exam.findByPk(examId, {
            order: [['shuffledQuestions', 'id', 'ASC']],
            include: [
                {
                    association: 'examination',
                    attributes: ['numberOfQuestions', 'duration']
                },
                {
                    association: 'shuffledQuestions',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'questionId', 'examId', 'selectedAnswerId']
                    },
                    include: [
                        {
                            association: 'questionDetail',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt', 'difficulty', 'questionBankId']
                            },
                            include: [
                                {
                                    association: 'answers',
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt', 'isCorrect', 'questionId']
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt',
                    'studentId',
                    'examinationId',
                    'score',
                    'correctAnswers',
                    'incorrectAnswers'
                ]
            }
        })
        return res.json({
            data: exam
        })
    } catch (error) {
        return next(createError(500))
    }
}

const submitExam = async (req, res, next) => {
    try {
        const { id: examId } = req.params
        const examData = req.body

        const exam = await Exam.findByPk(examId, {
            include: 'examination'
        })

        if (exam && exam.submitted) return next(createError(409))

        const answerIdsArr = Object.values(examData)

        const correctAnswerCount = await Answer.count({
            where: {
                id: {
                    [Op.in]: answerIdsArr
                },
                isCorrect: true
            }
        })

        const incorrectAnswerCount = answerIdsArr.length - correctAnswerCount

        const correctPercentage = (correctAnswerCount / answerIdsArr.length) * 100

        const score = ((correctPercentage / 100) * 10).toFixed(2)

        await exam.update({
            score: score,
            submitted: true,
            correctAnswers: correctAnswerCount,
            incorrectAnswers: incorrectAnswerCount
        })

        for (const [shuffledQuestionId, answerId] of Object.entries(examData)) {
            await ShuffledQuestion.update(
                {
                    selectedAnswerId: answerId
                },
                {
                    where: {
                        id: shuffledQuestionId
                    }
                }
            )
        }

        return res.json({ success: true, message: 'Submit exam success' })
    } catch (error) {
        return next(createError(500))
    }
}

module.exports = {
    createExam,
    getExamById,
    submitExam
}
