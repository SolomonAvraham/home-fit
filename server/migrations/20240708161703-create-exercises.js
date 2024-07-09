"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("exercises", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      duration: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      sets: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      reps: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      media: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("exercises");
  },
};
