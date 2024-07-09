"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const _1 = require(".");
class Progress extends sequelize_1.Model {
    static associate(model) {
        Progress.belongsTo(model.User, { foreignKey: "userId", as: "user" });
        Progress.belongsTo(model.Workout, {
            foreignKey: "workoutId",
            as: "workout",
        });
    }
}
Progress.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
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
    performanceMetrics: {
        type: sequelize_1.DataTypes.JSON,
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
    tableName: "progress",
    timestamps: true,
});
exports.default = Progress;
