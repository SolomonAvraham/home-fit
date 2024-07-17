import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { NotificationAssociate } from "../types/models";

export interface NotificationData {
  userId: string;
  message: string;
  read?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface NotificationAttributes {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface NotificationCreationAttributes
  extends Optional<
    NotificationAttributes,
    "id" | "read" | "createdAt" | "updatedAt"
  > {}

class Notification
  extends Model<NotificationAttributes, NotificationCreationAttributes>
  implements NotificationAttributes
{
  public id!: string;
  public userId!: string;
  public message!: string;
  public read!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(model: NotificationAssociate) {
    Notification.belongsTo(model.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}

Notification.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    read: {
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
    tableName: "notifications",
  }
);

export default Notification;
