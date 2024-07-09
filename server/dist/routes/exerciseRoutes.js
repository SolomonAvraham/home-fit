"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exerciseController_1 = __importDefault(require("../controllers/exerciseController"));
const router = (0, express_1.Router)();
router.post("/createExercise", exerciseController_1.default.createExercise);
router.get("/all", exerciseController_1.default.getAllExercises);
router.get("/getExerciseById/:id", exerciseController_1.default.getExerciseById);
router.put("/updateExercise/:id", exerciseController_1.default.updateExercise);
router.delete("/deleteExercise/:id", exerciseController_1.default.deleteExercise);
exports.default = router;
