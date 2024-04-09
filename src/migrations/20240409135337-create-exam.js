/* eslint-disable no-unused-vars */
'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('exams', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            studentId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            examinationId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            questionOrder: {
                type: Sequelize.JSON,
                allowNull: false,
                defaultValue: []
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('exams')
    }
}
