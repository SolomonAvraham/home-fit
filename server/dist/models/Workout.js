"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const User_1 = __importDefault(require("./User"));
const WorkoutPlan_1 = __importDefault(require("./WorkoutPlan"));
class Workout extends sequelize_1.Model {
    static associate() {
        Workout.belongsTo(User_1.default, { foreignKey: "userId", as: "user" });
        Workout.belongsTo(WorkoutPlan_1.default, {
            foreignKey: "workoutPlanId",
            as: "workoutPlan",
        });
    }
}
Workout.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    duration: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: User_1.default,
            key: "id",
        },
    },
    workoutPlanId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: WorkoutPlan_1.default,
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
    tableName: "workouts",
    timestamps: true,
});
exports.default = Workout;
