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
const uuid_1 = require("uuid");
const index_1 = require("../models/index");
const uuid_2 = require("uuid");
const formatMinutesToHours_1 = __importDefault(require("../utils/formatMinutesToHours"));
const sequelize_1 = require("sequelize");
class ExerciseService {
    isExerciseExist(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { exerciseId, userId } = data;
                const exercise = yield index_1.Exercise.findByPk(exerciseId);
                if (!exercise) {
                    throw new Error("Exercise not found");
                }
                const originalExerciseId = ((_b = (_a = exercise.createdBy) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.originalExerciseId) || exerciseId;
                const userHasExercise = yield index_1.Exercise.findOne({
                    where: {
                        userId,
                        createdBy: {
                            [sequelize_1.Op.contains]: [{ originalExerciseId }],
                        },
                    },
                });
                if (!userHasExercise) {
                    return false;
                }
                return true;
            }
            catch (error) {
                console.error("Check Exercise Existence Error:", error);
                throw error;
            }
        });
    }
    addExercise(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            try {
                const { exerciseId, userId } = data;
                const exercise = yield index_1.Exercise.findByPk(exerciseId);
                if (!exercise) {
                    throw new Error("Exercise not found");
                }
                const originalExerciseId = ((_b = (_a = exercise.createdBy) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.originalExerciseId) || exerciseId;
                const userHasExercise = yield index_1.Exercise.findOne({
                    where: {
                        userId,
                        [sequelize_1.Op.or]: [
                            {
                                createdBy: {
                                    [sequelize_1.Op.contains]: [{ originalExerciseId }],
                                },
                            },
                        ],
                    },
                });
                if (userHasExercise) {
                    throw new Error("Exercise already added for this user");
                }
                const newExercise = yield index_1.Exercise.create(Object.assign(Object.assign({}, exercise.toJSON()), { id: (0, uuid_2.v4)(), userId, createdBy: [
                        {
                            creatorName: (_d = (_c = exercise.createdBy) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.creatorName,
                            creatorId: (_f = (_e = exercise.createdBy) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.creatorId,
                            originalExerciseId,
                        },
                    ] }));
                if (!newExercise) {
                    throw new Error("Failed to create exercise");
                }
                return newExercise;
            }
            catch (error) {
                console.error("Add Exercise to Workout Service Error:", error);
                throw new Error(error.message);
            }
        });
    }
    isExerciseInWorkout(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { exerciseId, userId } = data;
                const exercise = yield index_1.Exercise.findByPk(exerciseId);
                if (!exercise) {
                    throw new Error("Exercise not found");
                }
                const workouts = yield index_1.Workout.findAll({
                    where: {
                        userId,
                    },
                    include: [
                        {
                            model: index_1.Exercise,
                            as: "exercises",
                            through: { attributes: [] },
                            attributes: ["id", "name"],
                        },
                    ],
                });
                if (!workouts) {
                    throw new Error("Workouts not found");
                }
                const excludedWorkouts = workouts
                    .filter((workout) => { var _a; return !((_a = workout.exercises) === null || _a === void 0 ? void 0 : _a.some((ex) => ex.id === exerciseId)); })
                    .map((workout) => {
                    return {
                        id: workout.id,
                        name: workout.name,
                    };
                });
                if (!excludedWorkouts[0]) {
                    return false;
                }
                return excludedWorkouts;
            }
            catch (error) {
                console.error("Check Exercise Existence Error:", error);
                if (error.message === "Exercise not found") {
                    throw new Error("Exercise not found");
                }
                throw new Error("Failed to check exercise existence");
            }
        });
    }
    addExerciseToWorkout(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { exerciseId, workoutId } = data;
            try {
                const exercise = yield index_1.Exercise.findByPk(exerciseId);
                if (!exercise) {
                    throw new Error("Exercise not found");
                }
                const workout = yield index_1.Workout.findByPk(workoutId);
                if (!workout) {
                    throw new Error("Workout not found");
                }
                const existingEntry = yield index_1.Workout_exercises.findOne({
                    where: {
                        exerciseId,
                        workoutId,
                    },
                });
                if (existingEntry) {
                    throw new Error("Exercise already added to this workout");
                }
                const addExercise = yield index_1.Workout_exercises.create({
                    workoutId,
                    exerciseId: exercise.id,
                });
                return addExercise;
            }
            catch (error) {
                console.error("Add Exercise to Workout Service Error:", error);
                throw new Error(error.message);
            }
        });
    }
    createExercise(exercise) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!exercise.name || !exercise.description) {
                    throw new Error("All fields are required");
                }
                const id = (0, uuid_2.v4)();
                if (!(0, uuid_1.validate)(id)) {
                    throw new Error("Invalid UUID format");
                }
                const getYoutubeEmbedUrl = (url) => {
                    if (!url)
                        return null;
                    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                    const match = url.match(regExp);
                    return match && match[2].length === 11
                        ? `https://www.youtube.com/embed/${match[2]}`
                        : null;
                };
                if (exercise.media && !getYoutubeEmbedUrl(exercise.media)) {
                    throw new Error("Invalid YouTube URL");
                }
                const newExercise = yield index_1.Exercise.create(Object.assign(Object.assign({}, exercise), { media: getYoutubeEmbedUrl(exercise.media), id, createdBy: [
                        {
                            creatorName: (_a = exercise.createdBy) === null || _a === void 0 ? void 0 : _a[0].creatorName,
                            creatorId: exercise.userId,
                            originalExerciseId: id,
                        },
                    ] }));
                if (!newExercise) {
                    throw new Error("Failed to create exercise");
                }
                if (exercise.workoutId) {
                    yield index_1.Workout_exercises.create({
                        workoutId: exercise.workoutId,
                        exerciseId: newExercise.id,
                    });
                }
                return newExercise;
            }
            catch (error) {
                console.error("Create Exercise Service Error:", error);
                if (error.parent && error.parent.code === "22P02") {
                    throw new Error("Invalid UUID format");
                }
                throw new Error(error.message);
            }
        });
    }
    getAllExercises() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            try {
                const offset = (page - 1) * limit;
                const { rows: exercises, count } = yield index_1.Exercise.findAndCountAll({
                    limit,
                    offset,
                    order: [["createdAt", "DESC"]],
                });
                const exerciseMap = new Map();
                const uniqueExercises = [];
                exercises.forEach((exercise) => {
                    var _a;
                    const exerciseJSON = exercise.toJSON();
                    const key = ((_a = exerciseJSON.createdBy) === null || _a === void 0 ? void 0 : _a[0].originalExerciseId) || exerciseJSON.id;
                    if (!exerciseMap.has(key)) {
                        exerciseMap.set(key, true);
                        uniqueExercises.push(exercise);
                    }
                });
                const formattedExercises = uniqueExercises.map((exercise) => {
                    var _a;
                    const exerciseJSON = exercise.toJSON();
                    return {
                        id: exerciseJSON.id,
                        name: exerciseJSON.name,
                        description: exerciseJSON.description,
                        duration: exerciseJSON.duration,
                        sets: exerciseJSON.sets,
                        reps: exerciseJSON.reps,
                        media: exerciseJSON.media,
                        userId: exerciseJSON.userId,
                        createdBy: (_a = exerciseJSON.createdBy) === null || _a === void 0 ? void 0 : _a.map((user) => ({
                            creatorId: user.creatorId,
                            creatorName: user.creatorName,
                            originalExerciseId: user.originalExerciseId,
                        })),
                        createdAt: exerciseJSON.createdAt,
                        updatedAt: exerciseJSON.updatedAt,
                    };
                });
                return {
                    total: count,
                    page,
                    limit,
                    exercises: formattedExercises,
                };
            }
            catch (error) {
                console.error("Get All Exercises Service Error:", error);
                throw new Error("Failed to fetch exercises");
            }
        });
    }
    getExercisesByUserId(userId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, page = 1, limit = 10) {
            try {
                const offset = (page - 1) * limit;
                const { rows: exercises, count } = yield index_1.Exercise.findAndCountAll({
                    where: { userId },
                    include: [
                        {
                            model: index_1.User,
                            as: "user",
                            attributes: ["id", "name"],
                        },
                    ],
                    order: [["createdAt", "DESC"]],
                    limit,
                    offset,
                });
                const formattedExercises = exercises.map((exercise) => {
                    var _a;
                    const exerciseJSON = exercise.toJSON();
                    const formattedTime = exerciseJSON.duration
                        ? (0, formatMinutesToHours_1.default)(exerciseJSON.duration)
                        : null;
                    return {
                        id: exerciseJSON.id,
                        name: exerciseJSON.name,
                        description: exerciseJSON.description,
                        duration: formattedTime,
                        sets: exerciseJSON.sets,
                        reps: exerciseJSON.reps,
                        media: exerciseJSON.media,
                        userId: exerciseJSON.userId,
                        createdBy: (_a = exerciseJSON.createdBy) === null || _a === void 0 ? void 0 : _a.map((creator) => ({
                            creatorId: creator.creatorId,
                            creatorName: creator.creatorName,
                            originalExerciseId: creator.originalExerciseId,
                        })),
                        createdAt: exerciseJSON.createdAt,
                        updatedAt: exerciseJSON.updatedAt,
                    };
                });
                return {
                    total: count,
                    page,
                    limit,
                    exercises: formattedExercises,
                };
            }
            catch (error) {
                console.error("Get Exercises By User ID Service Error:", error);
                throw new Error("Failed to fetch exercises");
            }
        });
    }
    getExerciseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("🚀 ~ ExerciseService ~ getExerciseById ~ id:", id);
            try {
                if (!(0, uuid_1.validate)(id)) {
                    throw new Error("Invalid UUID format");
                }
                const exercise = yield index_1.Exercise.findByPk(id);
                if (!exercise) {
                    throw new Error("Exercise not found");
                }
                return exercise;
            }
            catch (error) {
                console.error("Get Exercise By ID Service Error:", error);
                throw error;
            }
        });
    }
    updateExercise(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, uuid_1.validate)(id)) {
                    throw new Error("Invalid UUID format");
                }
                const exercise = yield index_1.Exercise.findByPk(id);
                if (!exercise) {
                    throw new Error("Exercise not found");
                }
                const updatedExercise = yield exercise.update(data);
                return updatedExercise;
            }
            catch (error) {
                console.error("Update Exercise Service Error:", error);
                throw error;
            }
        });
    }
    deleteExercise(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, uuid_1.validate)(id)) {
                    throw new Error("Invalid UUID format");
                }
                const exercise = yield index_1.Exercise.findByPk(id);
                if (!exercise) {
                    throw new Error("Exercise not found");
                }
                const WorkoutExercise = yield index_1.Workout_exercises.destroy({
                    where: { exerciseId: id },
                });
                yield exercise.destroy();
                const a = yield index_1.Workout_exercises.findAll({
                    where: { exerciseId: id },
                });
                return exercise;
            }
            catch (error) {
                console.error("Delete Exercise Service Error:", error);
                throw error;
            }
        });
    }
}
exports.default = new ExerciseService();
