"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const _1 = require(".");
class ScheduledWorkout extends sequelize_1.Model {
    static associate(models) {
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
ScheduledWorkout.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: _1.User,
            key: "id",
        },
    },
    workoutId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: _1.Workout,
            key: "id",
        },
    },
    scheduledDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    isDone: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.default,
    tableName: "scheduled_workouts",
    timestamps: true,
});
exports.default = ScheduledWorkout;
