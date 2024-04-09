/* eslint-disable no-unused-vars */
'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class ShuffledQuestion extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ShuffledQuestion.init(
        {
            questionId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            examId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            shuffledAnswerIds: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: []
            }
        },
        {
            sequelize,
            modelName: 'ShuffledQuestion',
            tableName: 'shuffled_questions',
            timestamps: true
        }
    )
    return ShuffledQuestion
}
