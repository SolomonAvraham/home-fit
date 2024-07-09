"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("exercises", "workoutId", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "workouts",
        key: "id",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("exercises", "workoutId");
  },
};
