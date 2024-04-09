/* eslint-disable no-unused-vars */
'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Student.init(
        {
            studentCode: {
                type: DataTypes.STRING,
                unique: true
            },
            firstName: {
                type: DataTypes.STRING
            },
            lastName: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            department: {
                type: DataTypes.STRING
            },
            classs: {
                type: DataTypes.STRING
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: 'st'
            }
        },
        {
            sequelize,
            modelName: 'Student',
            tableName: 'students',
            timestamps: true
        }
    )
    return Student
}
