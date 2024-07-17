"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Workout_exercises", {
      workoutId: {
        type: Sequelize.UUID,
        references: {
          model: "Workouts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      exerciseId: {
        type: Sequelize.UUID,
        references: {
          model: "Exercises",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Workout_exercises");
  },
};
