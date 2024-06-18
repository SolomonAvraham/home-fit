"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseRoutes = exports.workoutPlanRoutes = exports.notificationRoutes = exports.progressRoutes = exports.workoutRoute = exports.userRoute = void 0;
const userRoutes_1 = __importDefault(require("./userRoutes"));
exports.userRoute = userRoutes_1.default;
const workoutRoutes_1 = __importDefault(require("./workoutRoutes"));
exports.workoutRoute = workoutRoutes_1.default;
const progressRoutes_1 = __importDefault(require("./progressRoutes"));
exports.progressRoutes = progressRoutes_1.default;
const notificationRoutes_1 = __importDefault(require("./notificationRoutes"));
exports.notificationRoutes = notificationRoutes_1.default;
const workoutPlanRoutes_1 = __importDefault(require("./workoutPlanRoutes"));
exports.workoutPlanRoutes = workoutPlanRoutes_1.default;
const exerciseRoutes_1 = __importDefault(require("./exerciseRoutes"));
exports.exerciseRoutes = exerciseRoutes_1.default;
