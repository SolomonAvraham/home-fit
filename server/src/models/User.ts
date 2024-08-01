import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { UserAssociate, UserAttributes } from "../types/models";
import { Workout, ScheduledWorkout } from ".";

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models: UserAssociate) {
    User.hasMany(models.Exercise, {
      foreignKey: "userId",
      as: "exercises",
    });


    User.hasMany(models.Workout, {
      foreignKey: "userId",
      as: "workouts",
    });


    User.hasMany(models.ScheduledWorkout, {
      foreignKey: "userId",
      as: "scheduledWorkouts",
    });
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
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        },
      },
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
    timestamps: true,
  }
);

export default User;
