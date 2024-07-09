import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { Workout, User } from ".";
import Models from "../types/models";

export interface ProgressAttributes {
  id?: string;
  date: Date;
  userId: string;
  workoutId: string;
  performanceMetrics: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProgressCreationAttributes
  extends Optional<ProgressAttributes, "id"> {}

class Progress
  extends Model<ProgressAttributes, ProgressCreationAttributes>
  implements ProgressAttributes
{
  public id!: string;
  public date!: Date;
  public userId!: string;
  public workoutId!: string;
  public performanceMetrics!: any;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(model: Models) {
    Progress.belongsTo(model.User, { foreignKey: "userId", as: "user" });
    Progress.belongsTo(model.Workout, {
      foreignKey: "workoutId",
      as: "workout",
    });
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
    },
    workoutId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Workout,
        key: "id",
      },
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
    timestamps: true,
  }
);

export default Progress;
