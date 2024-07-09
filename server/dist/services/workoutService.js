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
const index_1 = require("../models/index");
const Workout_1 = __importDefault(require("../models/Workout"));
const uuid_1 = require("uuid");
class WorkoutService {
    createWorkout(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workoutData = Object.assign({ id: (0, uuid_1.v4)() }, data);
                const workout = yield Workout_1.default.create(workoutData);
                return workout;
            }
            catch (error) {
                console.error("Create Workout Service Error:", error);
                throw new Error("Failed to create workout");
            }
        });
    }
    getWorkoutById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Service: Fetching workout by ID:", id);
                const workout = yield Workout_1.default.findByPk(id, {
                    include: [
                        {
                            model: index_1.User,
                            as: "user",
                            attributes: ["id", "name"],
                        },
                        {
                            model: index_1.Exercise,
                            as: "exercises",
                            attributes: ["id", "name", "sets", "reps", "duration"],
                        },
                    ],
                });
                if (!workout) {
                    throw new Error("Workout not found");
                }
                return workout;
            }
            catch (error) {
                console.error("Get Workout By ID Service Error:", error);
                throw new Error("Workout not found");
            }
        });
    }
    getAllWorkouts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workouts = yield Workout_1.default.findAll({
                    include: [
                        {
                            model: index_1.User,
                            as: "user",
                            attributes: ["id", "name"],
                        },
                        {
                            model: index_1.Exercise,
                            as: "exercises",
                            attributes: ["id", "name", "sets", "reps", "duration"],
                        },
                    ],
                    limit: 10,
                    order: [["createdAt", "DESC"]],
                });
                const formattedWorkouts = workouts.map((workout) => {
                    var _a, _b;
                    const workoutJSON = workout.toJSON();
                    return {
                        id: workoutJSON.id,
                        date: workoutJSON.date,
                        duration: workoutJSON.duration,
                        userId: workoutJSON.userId,
                        userName: (_a = workoutJSON.user) === null || _a === void 0 ? void 0 : _a.name,
                        description: workoutJSON.description,
                        name: workoutJSON.name,
                        exercises: ((_b = workoutJSON.exercises) === null || _b === void 0 ? void 0 : _b.map((exercise) => ({
                            id: exercise.id,
                            name: exercise.name,
                            sets: exercise.sets,
                            reps: exercise.reps,
                            duration: exercise.duration,
                        }))) || [],
                        createdAt: workoutJSON.createdAt,
                        updatedAt: workoutJSON.updatedAt,
                    };
                });
                return formattedWorkouts;
            }
            catch (error) {
                console.error("Get All Workouts Service Error:", error);
                throw new Error("Failed to fetch workouts");
            }
        });
    }
    updateWorkout(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Service: Updating workout with ID:", id, "with data:", data);
                const workout = yield Workout_1.default.findByPk(id);
                if (!workout) {
                    throw new Error("Workout not found");
                }
                yield workout.update(data);
                return workout;
            }
            catch (error) {
                console.error("Update Workout Service Error:", error);
                throw new Error("Failed to update workout");
            }
        });
    }
    deleteWorkout(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Service: Deleting workout with ID:", id);
                const workout = yield Workout_1.default.findByPk(id);
                if (!workout) {
                    return 0; // Indicate workout not found
                }
                yield workout.destroy();
                return 1; // Indicate workout was deleted
            }
            catch (error) {
                console.error("Delete Workout Service Error:", error);
                throw new Error("Failed to delete workout");
            }
        });
    }
}
exports.default = new WorkoutService();
