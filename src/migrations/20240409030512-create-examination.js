/* eslint-disable no-unused-vars */
'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('examinations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            teacherId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            subjectId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            examName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            startDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            endDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            duration: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            classs: {
                type: Sequelize.STRING,
                allowNull: false
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
        await queryInterface.dropTable('examinations')
    }
}
