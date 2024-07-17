import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { Workout } from ".";
import { ExerciseAssociate, ExerciseAttributes } from "../types/models";



export interface ExerciseCreationAttributes
  extends Optional<ExerciseAttributes, "id"> {}

class Exercise
  extends Model<ExerciseAttributes, ExerciseCreationAttributes>
  implements ExerciseAttributes
{
  public id!: string;
  public name!: string;
  public description!: string;
  public duration?: string;
  public sets!: string;
  public reps!: string;
  public media?: string;
  public workoutId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(model: ExerciseAssociate) {
    Exercise.belongsToMany(model.Workout, {
      through: model.Workout_exercises,
      foreignKey: "exerciseId",
      otherKey: "workoutId",
      as: "workouts",
    });
  }
}

Exercise.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sets: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reps: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    media: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    workoutId: {
      type: DataTypes.UUID,
      references: {
        model: Workout,
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "exercises",
    timestamps: true,
  }
);

export default Exercise;
