import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

class WorkoutPlan extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
  public userId!: string;

  static associate() {
    WorkoutPlan.belongsTo(User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}

WorkoutPlan.init(
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
    userId: {
      type: DataTypes.UUID,
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
    tableName: "workout_plans",
  }
);

export default WorkoutPlan;
