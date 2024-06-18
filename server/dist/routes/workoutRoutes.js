"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workoutController_1 = __importDefault(require("../controllers/workoutController"));
const router = (0, express_1.Router)();
router.post("/", workoutController_1.default.createWorkout);
router.get("/all", workoutController_1.default.getAllWorkouts);
router.get("/:id", workoutController_1.default.getWorkoutById);
router.put("/:id", workoutController_1.default.updateWorkout);
router.delete("/:id", workoutController_1.default.deleteWorkout);
exports.default = router;
