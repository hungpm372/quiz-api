/* eslint-disable no-unused-vars */
'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Answer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Answer.belongsTo(models.Question, { foreignKey: 'questionId', as: 'question' })
        }
    }
    Answer.init(
        {
            questionId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            answerContent: DataTypes.STRING,
            isCorrect: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        {
            sequelize,
            modelName: 'Answer',
            tableName: 'answers',
            timestamps: true
        }
    )
    return Answer
}
