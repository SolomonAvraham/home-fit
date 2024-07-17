import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { User } from ".";
import { WorkoutAssociate } from "../types/models";

class Workout extends Model {
  public id!: string;
  public date!: Date;
  public duration!: number;
  public userId!: string;
  public description!: string;
  public name!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(model: WorkoutAssociate) {
    Workout.belongsTo(model.User, { foreignKey: "userId", as: "user" });
    Workout.belongsToMany(model.Exercise, {
      through: model.Workout_exercises,
      foreignKey: "workoutId",
      otherKey: "exerciseId",
      as: "exercises",
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
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
