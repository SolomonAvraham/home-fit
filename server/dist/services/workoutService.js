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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
const uuid_1 = require("uuid");
const uuid_2 = require("uuid");
const formatMinutesToHours_1 = __importDefault(require("../utils/formatMinutesToHours"));
const sequelize_1 = require("sequelize");
class WorkoutService {
    isWorkoutExist(workoutId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const workout = yield index_1.Workout.findByPk(workoutId);
                if (!workout) {
                    throw new Error("Workout not found");
                }
                const originalWorkoutId = ((_b = (_a = workout.createdBy) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.originalWorkoutId) || workoutId;
                const existingEntry = yield index_1.Workout.findOne({
                    where: {
                        userId: userId,
                        createdBy: {
                            [sequelize_1.Op.contains]: [{ originalWorkoutId }],
                        },
                    },
                });
                return !!existingEntry;
            }
            catch (error) {
                console.error("Check Workout Existence Error:", error.message);
                throw error;
            }
        });
    }
    addWorkout(workoutId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const workout = yield index_1.Workout.findByPk(workoutId, {
                    include: [
                        {
                            model: index_1.Exercise,
                            as: "exercises",
                            through: { attributes: [] },
                            attributes: [
                                "id",
                                "name",
                                "sets",
                                "reps",
                                "duration",
                                "description",
                                "media",
                                "createdBy",
                                "userId",
                            ],
                        },
                    ],
                    order: [["createdAt", "DESC"]],
                });
                if (!workout) {
                    throw new Error("Workout not found");
                }
                const originalWorkoutId = ((_b = (_a = workout.createdBy) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.originalWorkoutId) || workoutId;
                const existingEntry = yield index_1.Workout.findOne({
                    where: {
                        userId: userId,
                        createdBy: {
                            [sequelize_1.Op.contains]: [{ originalWorkoutId: originalWorkoutId }],
                        },
                    },
                });
                if (existingEntry) {
                    throw new Error("Workout already added to your workouts");
                }
                const newWorkout = yield index_1.Workout.create(Object.assign(Object.assign({}, workout.toJSON()), { id: (0, uuid_1.v4)(), userId, createdBy: workout.createdBy }));
                const checkExercise = yield index_1.Workout_exercises.findOne({
                    where: { workoutId },
                });
                const exercises = workout.toJSON().exercises;
                if (checkExercise && exercises) {
                    for (const exercise of exercises) {
                        const { id } = exercise, exerciseData = __rest(exercise, ["id"]);
                        const newExercise = yield index_1.Exercise.create(Object.assign(Object.assign({}, exerciseData), { id: (0, uuid_1.v4)(), workoutId: newWorkout.id, userId: userId, createdBy: exerciseData.createdBy }));
                        yield index_1.Workout_exercises.create({
                            workoutId: newWorkout.id,
                            exerciseId: newExercise.id,
                        });
                    }
                }
                return newWorkout;
            }
            catch (error) {
                console.error("Create Workout Service Error:", error);
                throw new Error(error.message);
            }
        });
    }
    getWorkoutsByUserId(userId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, page = 1, limit = 10) {
            try {
                if (!(0, uuid_2.validate)(userId)) {
                    return false;
                }
                const offset = (page - 1) * limit;
                const { rows: workouts, count } = yield index_1.Workout.findAndCountAll({
                    where: { userId },
                    include: [
                        {
                            model: index_1.User,
                            as: "user",
                            attributes: ["id", "name"],
                        },
                        {
                            model: index_1.Exercise,
                            as: "exercises",
                            through: { attributes: [] },
                            attributes: [
                                "id",
                                "name",
                                "sets",
                                "reps",
                                "duration",
                                "description",
                                "media",
                                "createdBy",
                                "userId",
                            ],
                        },
                    ],
                    order: [["createdAt", "DESC"]],
                    limit,
                    offset,
                });
                if (!workouts) {
                    throw new Error("Workouts not found");
                }
                const formattedWorkouts = workouts.map((workout) => {
                    var _a, _b, _c, _d, _e;
                    const workoutJSON = workout.toJSON();
                    const totalDuration = (_b = (_a = workoutJSON.exercises) === null || _a === void 0 ? void 0 : _a.reduce((total, exercise) => total + (exercise.duration || 0), 0)) !== null && _b !== void 0 ? _b : 0;
                    const formattedTime = (0, formatMinutesToHours_1.default)(totalDuration);
                    return {
                        id: workoutJSON.id,
                        duration: formattedTime,
                        userId: workoutJSON.userId,
                        userName: (_c = workoutJSON.user) === null || _c === void 0 ? void 0 : _c.name,
                        description: workoutJSON.description,
                        name: workoutJSON.name,
                        createdBy: (_d = workoutJSON.createdBy) === null || _d === void 0 ? void 0 : _d.map((creator) => ({
                            creatorId: creator.creatorId,
                            creatorName: creator.creatorName,
                        })),
                        exercises: ((_e = workoutJSON.exercises) === null || _e === void 0 ? void 0 : _e.map((exercise) => ({
                            id: exercise.id,
                            userId: exercise.userId,
                            name: exercise.name,
                            sets: exercise.sets,
                            reps: exercise.reps,
                            duration: exercise.duration,
                            media: exercise.media,
                            description: exercise.description,
                            createBy: exercise.createdBy,
                        }))) || [],
                        createdAt: workoutJSON.createdAt,
                        updatedAt: workoutJSON.updatedAt,
                    };
                });
                return {
                    total: count,
                    page,
                    limit,
                    workouts: formattedWorkouts,
                };
            }
            catch (error) {
                console.error("Get Workouts By User ID Service Error:", error);
                throw new Error("Failed to fetch workouts");
            }
        });
    }
    createWorkout(workoutData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!(0, uuid_2.validate)(workoutData.userId)) {
                throw new Error("Invalid UUID format");
            }
            try {
                const id = (0, uuid_1.v4)();
                if (!(0, uuid_2.validate)(id)) {
                    throw new Error("Invalid UUID format");
                }
                const workout = yield index_1.Workout.create(Object.assign(Object.assign({}, workoutData), { id, createdBy: [
                        {
                            creatorName: (_a = workoutData.createdBy) === null || _a === void 0 ? void 0 : _a[0].creatorName,
                            creatorId: workoutData.userId,
                            originalWorkoutId: id,
                        },
                    ] }));
                return workout;
            }
            catch (error) {
                console.error("Create Workout Service Error:", error);
                throw new Error(error.message);
            }
        });
    }
    getAllWorkouts() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            try {
                const offset = (page - 1) * limit;
                const { rows: workouts, count } = yield index_1.Workout.findAndCountAll({
                    include: [
                        {
                            model: index_1.User,
                            as: "user",
                            attributes: ["id", "name"],
                        },
                        {
                            model: index_1.Exercise,
                            as: "exercises",
                            through: { attributes: [] },
                            attributes: [
                                "id",
                                "name",
                                "sets",
                                "reps",
                                "duration",
                                "description",
                                "media",
                                "createdBy",
                                "userId",
                            ],
                        },
                    ],
                    order: [["createdAt", "DESC"]],
                    limit,
                    offset,
                });
                const workoutMap = new Map();
                const uniqueWorkouts = [];
                workouts.forEach((workout) => {
                    var _a;
                    const workoutJSON = workout.toJSON();
                    const key = ((_a = workoutJSON.createdBy) === null || _a === void 0 ? void 0 : _a[0].originalWorkoutId) || workoutJSON.id;
                    if (!workoutMap.has(key)) {
                        workoutMap.set(key, true);
                        uniqueWorkouts.push(workout);
                    }
                });
                const formattedWorkouts = uniqueWorkouts.map((workout) => {
                    var _a, _b, _c, _d, _e;
                    const workoutJSON = workout.toJSON();
                    const totalDuration = (_b = (_a = workoutJSON.exercises) === null || _a === void 0 ? void 0 : _a.reduce((total, exercise) => total + (exercise.duration || 0), 0)) !== null && _b !== void 0 ? _b : 0;
                    const formattedTime = (0, formatMinutesToHours_1.default)(totalDuration);
                    return {
                        id: workoutJSON.id,
                        duration: formattedTime,
                        userId: workoutJSON.userId,
                        userName: (_c = workoutJSON.user) === null || _c === void 0 ? void 0 : _c.name,
                        description: workoutJSON.description,
                        name: workoutJSON.name,
                        createdBy: (_d = workoutJSON.createdBy) === null || _d === void 0 ? void 0 : _d.map((user) => ({
                            creatorId: user.creatorId,
                            creatorName: user.creatorName,
                            originalWorkoutId: user.originalWorkoutId,
                        })),
                        exercises: ((_e = workoutJSON.exercises) === null || _e === void 0 ? void 0 : _e.map((exercise) => ({
                            id: exercise.id,
                            userId: exercise.userId,
                            name: exercise.name,
                            sets: exercise.sets,
                            reps: exercise.reps,
                            duration: exercise.duration,
                            media: exercise.media,
                            description: exercise.description,
                            createdBy: exercise.createdBy,
                        }))) || [],
                        createdAt: workoutJSON.createdAt,
                        updatedAt: workoutJSON.updatedAt,
                    };
                });
                return {
                    total: count,
                    page,
                    limit,
                    workouts: formattedWorkouts,
                };
            }
            catch (error) {
                console.error("Get All Workouts Service Error:", error);
                throw new Error("Failed to fetch workouts");
            }
        });
    }
    getWorkoutById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const workout = yield index_1.Workout.findByPk(id, {
                    include: [
                        {
                            model: index_1.User,
                            as: "user",
                            attributes: ["id", "name"],
                        },
                        {
                            model: index_1.Exercise,
                            as: "exercises",
                            attributes: ["id", "name", "sets", "reps", "duration", "userId"],
                        },
                    ],
                });
                if (!workout) {
                    return null;
                }
                const workoutJSON = workout.toJSON();
                const totalDuration = (_b = (_a = workoutJSON.exercises) === null || _a === void 0 ? void 0 : _a.reduce((total, exercise) => total + (exercise.duration || 0), 0)) !== null && _b !== void 0 ? _b : 0;
                const formattedTime = (0, formatMinutesToHours_1.default)(totalDuration);
                workout.duration = formattedTime;
                return workout;
            }
            catch (error) {
                console.error("Get Workout By ID Service Error:", error);
                throw new Error("Workout not found");
            }
        });
    }
    updateWorkout(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id, data);
            try {
                if (!(0, uuid_2.validate)(id)) {
                    throw new Error("Invalid UUID format");
                }
                console.log("Service: Updating workout with ID:", id, "with data:", data);
                const workout = yield index_1.Workout.findByPk(id);
                if (!workout) {
                    return false;
                }
                yield workout.update(data);
                return workout;
            }
            catch (error) {
                console.error("Update Workout Service Error:", error);
                throw error;
            }
        });
    }
    deleteWorkout(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, uuid_2.validate)(id)) {
                    throw new Error("Invalid UUID format");
                }
                console.log("Service: Deleting workout with ID:", id);
                const workout = yield index_1.Workout.findByPk(id);
                if (!workout) {
                    return 0;
                }
                yield workout.destroy();
                return 1;
            }
            catch (error) {
                console.error("Delete Workout Service Error:", error);
                throw new Error("Failed to delete workout");
            }
        });
    }
}
exports.default = new WorkoutService();
