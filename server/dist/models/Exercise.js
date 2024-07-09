"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const _1 = require(".");
class Exercise extends sequelize_1.Model {
    static associate(model) {
        Exercise.belongsTo(model.Workout, {
            foreignKey: "workoutId",
            as: "workout",
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
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    sets: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    reps: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    media: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    workoutId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: _1.Workout,
            key: "id",
        },
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
