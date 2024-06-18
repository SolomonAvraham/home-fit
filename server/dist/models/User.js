"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const WorkoutPlan_1 = __importDefault(require("./WorkoutPlan"));
const Progress_1 = __importDefault(require("./Progress"));
const Notification_1 = __importDefault(require("./Notification"));
class User extends sequelize_1.Model {
    static associate() {
        User.hasMany(WorkoutPlan_1.default, { foreignKey: "userId", as: "workouts" });
        User.hasMany(Progress_1.default, { foreignKey: "userId", as: "progress" });
        User.hasMany(Notification_1.default, { foreignKey: "userId", as: "notifications" });
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING(50),
        defaultValue: "user",
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
    tableName: "users",
});
exports.default = User;
