"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Add the 'name' column as nullable
    await queryInterface.addColumn("workouts", "name", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Step 2: Update existing rows with a default value
    await queryInterface.sequelize.query(
      `UPDATE workouts SET name = 'Unnamed Workout' WHERE name IS NULL;`
    );

    // Step 3: Alter the column to make it non-nullable
    await queryInterface.changeColumn("workouts", "name", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("workouts", "name");
  },
};
