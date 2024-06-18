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
const workoutService_1 = __importDefault(require("../services/workoutService"));
class WorkoutController {
    static createWorkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workout = yield workoutService_1.default.createWorkout(req.body);
                res.status(201).json(workout);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                console.log(error);
            }
        });
    }
    static getAllWorkouts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workouts = yield workoutService_1.default.getAllWorkouts();
                res.status(200).json(workouts);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                console.log(error);
            }
        });
    }
    static getWorkoutById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workout = yield workoutService_1.default.getWorkoutById(req.params.id);
                if (!workout) {
                    return res.status(404).json({ message: "Workout not found" });
                }
                res.status(200).json(workout);
            }
            catch (error) { }
        });
    }
    static updateWorkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workout = yield workoutService_1.default.updateWorkout(req.params.id, req.body);
                if (!workout) {
                    return res.status(404).json({ message: "Workout not found" });
                }
                res.status(200).json(workout);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                console.log(error);
            }
        });
    }
    static deleteWorkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield workoutService_1.default.deleteWorkout(req.params.id);
                if (!deleted) {
                    return res.status(404).json({ message: "Workout not found" });
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
exports.default = WorkoutController;
