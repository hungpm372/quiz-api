/* eslint-disable no-unused-vars */
'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Examination extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Examination.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' })
            Examination.belongsTo(models.Teacher, { foreignKey: 'teacherId', as: 'teacher' })
        }
    }
    Examination.init(
        {
            teacherId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            subjectId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            examName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            startDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            duration: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            classs: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Examination',
            tableName: 'examinations',
            timestamps: true
        }
    )
    return Examination
}
