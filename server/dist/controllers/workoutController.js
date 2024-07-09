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
const uuid_1 = require("uuid");
class WorkoutController {
    createWorkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, date, duration, description, name, exercises } = req.body;
                console.log("Creating workout with data:", {
                    userId,
                    date,
                    duration,
                    description,
                    name,
                    exercises,
                });
                const workout = yield workoutService_1.default.createWorkout({
                    userId,
                    date,
                    duration,
                    description,
                    name,
                    exercises,
                });
                return res.status(201).json(workout);
            }
            catch (error) {
                console.error("Error in createWorkout:", error.message);
                return res
                    .status(400)
                    .json({ message: "Failed to create workout", error: error.message });
            }
        });
    }
    getWorkoutById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!(0, uuid_1.validate)(id)) {
                    return res.status(400).json({ message: "Invalid UUID format" });
                }
                const workout = yield workoutService_1.default.getWorkoutById(id);
                if (!workout) {
                    return res.status(404).json({ message: "Workout not found" });
                }
                return res.status(200).json(workout);
            }
            catch (error) {
                return res
                    .status(400)
                    .json({ message: "Failed to get workout", error: error.message });
            }
        });
    }
    getAllWorkouts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workouts = yield workoutService_1.default.getAllWorkouts();
                return res.status(200).json(workouts);
            }
            catch (error) {
                console.error("Error in getAllWorkouts:", error.message);
                return res
                    .status(500)
                    .json({ message: "Failed to get workouts", error: error.message });
            }
        });
    }
    updateWorkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!(0, uuid_1.validate)(id)) {
                    return res.status(400).json({ message: "Invalid UUID format" });
                }
                const { date, duration, description, name, exercises } = req.body;
                const workout = yield workoutService_1.default.updateWorkout(id, {
                    date,
                    duration,
                    description,
                    name,
                    exercises,
                });
                if (!workout) {
                    return res.status(404).json({ message: "Workout not found" });
                }
                return res.status(200).json(workout);
            }
            catch (error) {
                return res
                    .status(400)
                    .json({ message: "Failed to update workout", error: error.message });
            }
        });
    }
    deleteWorkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!(0, uuid_1.validate)(id)) {
                    return res.status(400).json({ message: "Invalid UUID format" });
                }
                const result = yield workoutService_1.default.deleteWorkout(id);
                if (result === 0) {
                    return res.status(404).json({ message: "Workout not found" });
                }
                return res.status(204).send();
            }
            catch (error) {
                return res
                    .status(400)
                    .json({ message: "Failed to delete workout", error: error.message });
            }
        });
    }
}
exports.default = new WorkoutController();
