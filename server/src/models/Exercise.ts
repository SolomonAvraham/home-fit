import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";


export interface ExerciseAttributes {
  id?: string;
  name: string;
  description: string;
  muscleGroup: string;
  media: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ExerciseCreationAttributes
  extends Optional<ExerciseAttributes, "id"> {}

class Exercise
  extends Model<ExerciseAttributes, ExerciseCreationAttributes>
  implements ExerciseAttributes
{
  public id!: string;
  public name!: string;
  public description!: string;
  public muscleGroup!: string;
  public media!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate() {}
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
    muscleGroup: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    media: {
      type: DataTypes.TEXT,
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
  }
);

export default Exercise;
