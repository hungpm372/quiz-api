/* eslint-disable no-unused-vars */
'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class QuestionBank extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            QuestionBank.belongsTo(models.Teacher, { foreignKey: 'teacherId' })
            QuestionBank.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' })
        }
    }
    QuestionBank.init(
        {
            questionBankCode: DataTypes.STRING,
            teacherId: DataTypes.INTEGER,
            title: DataTypes.STRING,
            subjectId: DataTypes.INTEGER,
            numberOfQuestions: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
        },
        {
            sequelize,
            modelName: 'QuestionBank',
            tableName: 'questionbanks',
            timestamps: true
        }
    )
    return QuestionBank
}
