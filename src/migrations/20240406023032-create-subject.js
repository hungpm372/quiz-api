/* eslint-disable no-unused-vars */
'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('subjects', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            subjectName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            credits: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            theoryHours: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            practiceHours: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('active', 'inactive'),
                allowNull: false,
                defaultValue: 'active'
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
        await queryInterface.dropTable('subjects')
    }
}
