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
exports.ExerciseController = void 0;
const exerciseService_1 = __importDefault(require("../services/exerciseService"));
class ExerciseController {
    static createExercise(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exercise = yield exerciseService_1.default.createExercise(req.body);
                res.status(201).json(exercise);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                console.log(error);
            }
        });
    }
    static getAllExercises(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exercises = yield exerciseService_1.default.getAllExercises();
                res.status(200).json(exercises);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                console.log(error);
            }
        });
    }
    static getExerciseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exercise = yield exerciseService_1.default.getExerciseById(req.params.id);
                if (!exercise) {
                    return res.status(404).json({ message: "Exercise not found" });
                }
                res.status(200).json(exercise);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                console.log(error);
            }
        });
    }
    static updateExercise(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exercise = yield exerciseService_1.default.updateExercise(req.params.id, req.body);
                if (!exercise) {
                    return res.status(404).json({ message: "Exercise not found" });
                }
                res.status(200).json(exercise);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                console.log(error);
            }
        });
    }
    static deleteExercise(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield exerciseService_1.default.deleteExercise(req.params.id);
                if (!deleted) {
                    return res.status(404).json({ message: "Exercise not found" });
                }
                res.status(204).json();
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                console.log(error);
            }
        });
    }
}
exports.ExerciseController = ExerciseController;
