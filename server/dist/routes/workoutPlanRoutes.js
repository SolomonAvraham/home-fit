"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workoutPlanController_1 = __importDefault(require("../controllers/workoutPlanController"));
const router = (0, express_1.Router)();
router.post("/", workoutPlanController_1.default.createWorkoutPlan);
router.get("/all", workoutPlanController_1.default.getAllWorkoutPlans);
router.get("/:id", workoutPlanController_1.default.getWorkoutPlanById);
router.put("/:id", workoutPlanController_1.default.updateWorkoutPlan);
router.delete("/:id", workoutPlanController_1.default.deleteWorkoutPlan);
exports.default = router;
