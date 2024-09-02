import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Workout_exercises extends Model {
  public workoutId!: string;
  public exerciseId!: string;
}

Workout_exercises.init(
  {
    workoutId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "workouts",
        key: "id",
      },
      onDelete: "CASCADE",
      primaryKey: true,
    },
    exerciseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "exercises",
        key: "id",
      },
      onDelete: "CASCADE",
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "workout_exercises",
    timestamps: false,
  }
);

export default Workout_exercises;
