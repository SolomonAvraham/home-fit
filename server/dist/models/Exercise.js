"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Exercise extends sequelize_1.Model {
    static associate(models) {
        Exercise.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
        });
        Exercise.belongsToMany(models.Workout, {
            through: models.Workout_exercises,
            foreignKey: "exerciseId",
            otherKey: "workoutId",
            as: "workouts",
        });
    }
}
Exercise.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    duration: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    sets: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    reps: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    media: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
    },
    createdBy: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: false,
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
    tableName: "exercises",
    timestamps: true,
});
exports.default = Exercise;
