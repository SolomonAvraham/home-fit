"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exerciseService_1 = __importDefault(require("../services/exerciseService"));
const uuid_1 = require("uuid");
class ExerciseController {
    static isExerciseExist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { exerciseId, userId } = req.params;
            if (!(0, uuid_1.validate)(exerciseId) || !(0, uuid_1.validate)(userId)) {
                return res.status(400).json({ message: "Invalid exercise or user ID" });
            }
            try {
                const exerciseExists = yield exerciseService_1.default.isExerciseExist({
                    exerciseId,
                    userId,
                });
                return res.status(200).json(exerciseExists);
            }
            catch (error) {
                console.error("Error in addExerciseToWorkout:", error.message);
                return res.status(500).json({
                    message: error.message,
                });
            }
        });
    }
    static isExerciseInWorkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { exerciseId, userId } = req.params;
            if (!(0, uuid_1.validate)(exerciseId) || !(0, uuid_1.validate)(userId)) {
                return res.status(400).json({ message: "Invalid exercise or user ID" });
            }
            try {
                const exerciseExists = yield exerciseService_1.default.isExerciseInWorkout({
                    exerciseId,
                    userId,
                });
                return res.status(200).json(exerciseExists);
            }
            catch (error) {
                console.error("Error in addExerciseToWorkout:", error.message);
                return res.status(500).json({
                    message: error.message,
                });
            }
        });
    }
    static addExercise(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { exerciseId, userId } = req.params;
            if (!(0, uuid_1.validate)(exerciseId)) {
                return res.status(400).json({ message: "Invalid exercise ID" });
            }
            try {
                const updatedExercise = yield exerciseService_1.default.addExercise({
                    exerciseId,
                    userId,
                });
                return res.status(200).json(updatedExercise);
            }
            catch (error) {
                console.error("Error in addExerciseToWorkout:", error.message);
                return res.status(500).json({
                    message: error.message,
                });
            }
        });
    }
    static addExerciseToWorkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { exerciseId, workoutId } = req.params;
            if (!(0, uuid_1.validate)(exerciseId) || !(0, uuid_1.validate)(workoutId)) {
                return res
                    .status(400)
                    .json({ message: "Invalid exercise or workout ID" });
            }
            try {
                const updatedExercise = yield exerciseService_1.default.addExerciseToWorkout({
                    exerciseId,
                    workoutId,
                });
                return res.status(200).json(updatedExercise);
            }
            catch (error) {
                console.error("Error in addExerciseToWorkout:", error.message);
                return res.status(500).json({
                    message: error.message,
                });
            }
        });
    }
    static createExercise(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exercise = yield exerciseService_1.default.createExercise(req.body);
                return res.status(201).json(exercise);
            }
            catch (error) {
                console.error("Error in createExercise:", error.message);
                return res.status(400).json({ message: error.message });
            }
        });
    }
    static getAllExercises(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 10;
            try {
                const result = yield exerciseService_1.default.getAllExercises(page, limit);
                return res.status(200).json(result);
            }
            catch (error) {
                console.error("Error in getAllExercises:", error.message);
                return res.status(500).json({ message: error.message, error });
            }
        });
    }
    static getExercisesByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 10;
            try {
                const result = yield exerciseService_1.default.getExercisesByUserId(userId, page, limit);
                return res.status(200).json(result);
            }
            catch (error) {
                console.error("Error in getExercisesByUserId:", error.message);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    static getExerciseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!(0, uuid_1.validate)(id)) {
                    return res.status(400).json({ message: "Invalid UUID format" });
                }
                const exercise = yield exerciseService_1.default.getExerciseById(id);
                if (!exercise) {
                    return res.status(404).json({ message: "Exercise not found" });
                }
                return res.status(200).json(exercise);
            }
            catch (error) {
                console.error("Error in getExerciseById:", error.message);
                return res.status(400).json({ message: error.message, error });
            }
        });
    }
    static updateExercise(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!(0, uuid_1.validate)(id)) {
                    return res.status(400).json({ message: "Invalid UUID format" });
                }
                const exercise = yield exerciseService_1.default.updateExercise(id, req.body);
                if (!exercise) {
                    return res.status(404).json({ message: "Exercise not found" });
                }
                return res.status(200).json(exercise);
            }
            catch (error) {
                console.error("Error in updateExercise:", error.message);
                return res.status(400).json({ message: error.message, error });
            }
        });
    }
    static deleteExercise(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!(0, uuid_1.validate)(id)) {
                    return res.status(400).json({ message: "Invalid UUID format" });
                }
                const deleted = yield exerciseService_1.default.deleteExercise(id);
                if (!deleted) {
                    return res.status(404).json({ message: "Exercise not found" });
                }
                return res.status(204).send();
            }
            catch (error) {
                console.error("Error in deleteExercise:", error.message);
                return res.status(400).json({ message: error.message, error });
            }
        });
    }
}
exports.default = ExerciseController;
