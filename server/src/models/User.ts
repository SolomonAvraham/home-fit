import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Workout from "./WorkoutPlan";
import Progress from "./Progress";
import Notification from "./Notification";
class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate() {
    User.hasMany(Workout, { foreignKey: "userId", as: "workouts" });
    User.hasMany(Progress, { foreignKey: "userId", as: "progress" });
    User.hasMany(Notification, { foreignKey: "userId", as: "notifications" });
  }
}

User.init(
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(50),
      defaultValue: "user",
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
    tableName: "users",
  }
);

export default User;
