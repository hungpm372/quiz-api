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
            // define association here
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
            questionOrder: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: []
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
