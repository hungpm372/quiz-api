/* eslint-disable no-unused-vars */
'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('shuffled_questions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            questionId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            examId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            shuffledAnswerIds: {
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
        await queryInterface.dropTable('shuffled_questions')
    }
}
