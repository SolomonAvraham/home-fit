"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("workout_exercises", {
      workoutId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "workouts",
          key: "id",
        },
        primaryKey: true,
      },
      exerciseId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "exercises",
          key: "id",
        },
        primaryKey: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("workout_exercises");
  },
};
