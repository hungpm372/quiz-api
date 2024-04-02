/* eslint-disable no-unused-vars */
'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Question.hasMany(models.Answer, { foreignKey: 'questionId', as: 'answers' })
        }
    }
    Question.init(
        {
            questionBankId: DataTypes.INTEGER,
            content: DataTypes.STRING,
            difficulty: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'Question',
            tableName: 'questions',
            timestamps: true
        }
    )
    return Question
}
