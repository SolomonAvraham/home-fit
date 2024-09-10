"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workoutController_1 = __importDefault(require("../controllers/workoutController"));
const validateUUID_1 = require("../middleware/validateUUID");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/addWorkout/:id/user/:userId", authMiddleware_1.default, workoutController_1.default.addWorkout);
router.post("/createWorkout", authMiddleware_1.default, workoutController_1.default.createWorkout);
router.get("/isWorkoutExist", authMiddleware_1.default, workoutController_1.default.isWorkoutExist);
router.get("/all", workoutController_1.default.getAllWorkouts);
router.get("/WorkoutById/:id", validateUUID_1.validateUUID, workoutController_1.default.getWorkoutById);
router.get("/WorkoutsByUserId/:id", validateUUID_1.validateUUID, authMiddleware_1.default, workoutController_1.default.getWorkoutsByUserId);
router.put("/updateWorkout/:id", validateUUID_1.validateUUID, authMiddleware_1.default, workoutController_1.default.updateWorkout);
router.delete("/deleteWorkout/:id", validateUUID_1.validateUUID, authMiddleware_1.default, workoutController_1.default.deleteWorkout);
exports.default = router;
