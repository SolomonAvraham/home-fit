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
    isWorkoutExist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { workoutId, userId } = req.query;
            if (!(0, uuid_1.validate)(workoutId) || !(0, uuid_1.validate)(userId)) {
                return res.status(400).json({ message: "Invalid UUID format" });
            }
            try {
                const exists = yield workoutService_1.default.isWorkoutExist(workoutId, userId);
                if (!exists) {
                    return res.status(404).json({ message: "Workout not found" });
                }
                return res.status(200).json(exists);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    addWorkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, userId } = req.params;
                if (!(0, uuid_1.validate)(id) || !(0, uuid_1.validate)(userId)) {
                    return res.status(400).json({ message: "Invalid UUID format" });
                }
                const workout = yield workoutService_1.default.addWorkout(id, userId);
                return res.status(200).json(workout);
            }
            catch (error) {
                console.error("Error in addWorkout:", error.message);
                return res.status(400).json({ message: error.message });
            }
        });
    }
    getWorkoutsByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.params;
            if (!(0, uuid_1.validate)(userId)) {
                return res.status(400).json({ message: "Invalid user ID" });
            }
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 10;
            try {
                const result = yield workoutService_1.default.getWorkoutsByUserId(userId, page, limit);
                return res.status(200).json(result);
            }
            catch (error) {
                console.error("Error in getWorkoutsByUserId:", error.message);
                return res
                    .status(500)
                    .json({ message: "Failed to get workouts", error: error.message });
            }
        });
    }
    createWorkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, id = (0, uuid_1.v4)(), duration, description, name, createdBy, } = req.body;
                const workout = yield workoutService_1.default.createWorkout({
                    userId,
                    id,
                    duration,
                    description,
                    name,
                    createdBy,
                });
                return res.status(201).json(workout);
            }
            catch (error) {
                console.error("Error in createWorkout:", error.message);
                return res.status(400).json({ message: error.message });
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
                return res.status(500).json({ message: error.message });
            }
        });
    }
    getAllWorkouts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page, 10) || 1;
                const limit = parseInt(req.query.limit, 10) || 10;
                const result = yield workoutService_1.default.getAllWorkouts(page, limit);
                return res.status(200).json(result);
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
                const { duration, description, name, exercises } = req.body;
                const workout = yield workoutService_1.default.updateWorkout(id, {
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
                if (process.env.NODE_ENV === "test") {
                    console.log("sgsfgsfgsgsf");
                }
                return res
                    .status(500)
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
