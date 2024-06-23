"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exerciseController_1 = require("../controllers/exerciseController");
const router = (0, express_1.Router)();
router.post("/", exerciseController_1.ExerciseController.createExercise);
router.get("/all", exerciseController_1.ExerciseController.getAllExercises);
router.get("/:id", exerciseController_1.ExerciseController.getExerciseById);
router.put("/:id", exerciseController_1.ExerciseController.updateExercise);
router.delete("/:id", exerciseController_1.ExerciseController.deleteExercise);
exports.default = router;