import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { Workout, Workout_exercises, User } from ".";
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
  public duration?: number;
  public sets?: number;
  public reps?: number;
  public media?: string;
  public userId!: string;
  public createdBy?: {
    creatorId: string;
    creatorName: string;
    originalExerciseId?: string;
  }[];
  public createdAt!: Date;
  public updatedAt!: Date;
  public workoutId?: string;

  static associate(models: ExerciseAssociate) {
    Exercise.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    Exercise.belongsToMany(models.Workout, {
      through: models.Workout_exercises,
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
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    media: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    createdBy: {
      type: DataTypes.JSONB,
      allowNull: false,
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
