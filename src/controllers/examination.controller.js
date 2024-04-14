const createError = require('http-errors')
const { Examination } = require('~/models')

const createExamination = async (req, res, next) => {
    try {
        const { teacherId, subjectId, examName, startDate, endDate, duration, classs, numberOfQuestions } = req.body
        
        const examination = await Examination.create({
            teacherId,
            subjectId,
            examName,
            startDate,
            endDate,
            duration,
            classs,
            numberOfQuestions
        })

        return res.json({
            data: examination.toJSON()
        })
    } catch (error) {
        return next(createError(500))
    }
}

module.exports = {
    createExamination
}
