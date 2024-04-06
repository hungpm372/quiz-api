/* eslint-disable no-unused-vars */
'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Subject extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Subject.init(
        {
            subjectName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            credits: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            theoryHours: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            practiceHours: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM('active', 'inactive'),
                allowNull: false,
                defaultValue: 'active'
            }
        },
        {
            sequelize,
            modelName: 'Subject',
            tableName: 'subjects',
            timestamps: true
        }
    )
    return Subject
}
