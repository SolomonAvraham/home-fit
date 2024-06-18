import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import WorkoutPlan from "./WorkoutPlan";

class Workout extends Model {
  public id!: string;
  public date!: Date;
  public duration!: number;
  public userId!: string;
  public workoutPlanId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate() {
    Workout.belongsTo(User, { foreignKey: "userId", as: "user" });
    Workout.belongsTo(WorkoutPlan, {
      foreignKey: "workoutPlanId",
      as: "workoutPlan",
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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    workoutPlanId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: WorkoutPlan,
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
    tableName: "workouts",
    timestamps: true,
  }
);

export default Workout;
