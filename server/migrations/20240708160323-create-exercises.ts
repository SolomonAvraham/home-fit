import { QueryInterface, DataTypes } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("exercises", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      duration: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      sets: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      reps: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      media: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("exercises");
  },
};
