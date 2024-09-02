"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn("exercises", "createdBy", {
      type: Sequelize.JSONB,
      allowNull: false,
      defaultValue: [], 
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn("exercises", "createdBy");
  },
};
