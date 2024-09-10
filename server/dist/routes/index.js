"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRoute = exports.exerciseRoutes = exports.workoutRoute = exports.userRoute = void 0;
const userRoutes_1 = __importDefault(require("./userRoutes"));
exports.userRoute = userRoutes_1.default;
const workoutRoutes_1 = __importDefault(require("./workoutRoutes"));
exports.workoutRoute = workoutRoutes_1.default;
const exerciseRoutes_1 = __importDefault(require("./exerciseRoutes"));
exports.exerciseRoutes = exerciseRoutes_1.default;
const testRoutes_1 = __importDefault(require("./testRoutes"));
exports.testRoute = testRoutes_1.default;
