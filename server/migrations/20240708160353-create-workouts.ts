import { QueryInterface, DataTypes } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("workouts", {
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
      duration: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      exercises: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: true,
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
    await queryInterface.dropTable("workouts");
  },
};
