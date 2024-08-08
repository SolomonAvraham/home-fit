import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { WorkoutAssociate, WorkoutAttributes } from "../types/models";
import { Exercise, User } from ".";

export interface WorkoutCreationAttributes
  extends Optional<WorkoutAttributes, "id"> {}

class Workout
  extends Model<WorkoutAttributes, WorkoutCreationAttributes>
  implements WorkoutAttributes
{
  public id!: string;
  public name!: string;
  public description!: string;
  public duration?: string;
  public userId!: string;
  public createdBy?: {
    creatorId: string;
    creatorName: string;
    originalWorkoutId?: string;
  }[];
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models: WorkoutAssociate) {
    Workout.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    Workout.belongsToMany(models.Exercise, {
      through: models.Workout_exercises,
      foreignKey: "workoutId",
      otherKey: "exerciseId",
      as: "exercises",
    });
    Workout.hasMany(models.ScheduledWorkout, {
      foreignKey: "workoutId",
      as: "scheduledWorkouts",
    });
  }
}

Workout.init(
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
    tableName: "workouts",
    timestamps: true,
  }
);

export default Workout;
