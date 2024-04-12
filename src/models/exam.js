/* eslint-disable no-unused-vars */
'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Exam extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Exam.belongsTo(models.Examination, { foreignKey: 'examinationId', as: 'examination' })
            Exam.hasMany(models.ShuffledQuestion, { foreignKey: 'examId', as: 'shuffledQuestions' })
        }
    }
    Exam.init(
        {
            studentId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            examinationId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            score: {
                type: DataTypes.FLOAT,
                allowNull: true,
                defaultValue: null
            },
            correctAnswers: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: null
            },
            incorrectAnswers: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: null
            },
            submitted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        {
            sequelize,
            modelName: 'Exam',
            tableName: 'exams',
            timestamps: true
        }
    )
    return Exam
}
