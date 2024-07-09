import { QueryInterface, DataTypes } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("progress", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      workoutId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "workouts",
          key: "id",
        },
      },
      performanceMetrics: {
        allowNull: false,
        type: DataTypes.JSON,
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
    await queryInterface.dropTable("progress");
  },
};
