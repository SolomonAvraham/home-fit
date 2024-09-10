"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Workout_exercises extends sequelize_1.Model {
}
Workout_exercises.init({
    workoutId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "workouts",
            key: "id",
        },
        onDelete: "CASCADE",
        primaryKey: true,
    },
    exerciseId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "exercises",
            key: "id",
        },
        onDelete: "CASCADE",
        primaryKey: true,
    },
}, {
    sequelize: database_1.default,
    tableName: "workout_exercises",
    timestamps: false,
});
exports.default = Workout_exercises;
