import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { User, Workout } from ".";
import { ScheduledWorkoutAssociate, ScheduledWorkoutAttributes } from "../types/models";



export interface ScheduledWorkoutCreationAttributes
  extends Optional<ScheduledWorkoutAttributes, "id"> {}

class ScheduledWorkout
  extends Model<ScheduledWorkoutAttributes, ScheduledWorkoutCreationAttributes>
  implements ScheduledWorkoutAttributes
{
  public id!: string;
  public userId!: string;
  public workoutId!: string;
  public scheduledDate!: Date;
  public isDone!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
 
  static associate(models: ScheduledWorkoutAssociate) {
    ScheduledWorkout.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    ScheduledWorkout.belongsTo(models.Workout, {
      foreignKey: "workoutId",
      as: "workout",
    });
  }
}

ScheduledWorkout.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    workoutId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Workout,
        key: "id",
      },
    },
    scheduledDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    tableName: "scheduled_workouts",
    timestamps: true,
  }
);

export default ScheduledWorkout;
