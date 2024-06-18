import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import Workout from "./Workout";

class Progress extends Model {
  public id!: string;
  public date!: Date;
  public userId!: string;
  public workoutId!: string;
  public performanceMetrics!: object;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate() {
    Progress.belongsTo(User, { foreignKey: "userId", as: "user" });
    Progress.belongsTo(Workout, { foreignKey: "workoutId", as: "workout" });
  }
}

Progress.init(
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    workoutId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Workout,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    performanceMetrics: {
      type: DataTypes.JSON,
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
    tableName: "progress",
  }
);

export default Progress;
