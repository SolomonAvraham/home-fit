"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledWorkout = exports.Workout_exercises = exports.Exercise = exports.Workout = exports.User = exports.sequelize = void 0;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Workout_1 = __importDefault(require("./Workout"));
exports.Workout = Workout_1.default;
const Exercise_1 = __importDefault(require("./Exercise"));
exports.Exercise = Exercise_1.default;
const database_1 = __importDefault(require("../config/database"));
exports.sequelize = database_1.default;
const Workout_exercises_1 = __importDefault(require("./Workout_exercises"));
exports.Workout_exercises = Workout_exercises_1.default;
const ScheduledWorkout_1 = __importDefault(require("./ScheduledWorkout"));
exports.ScheduledWorkout = ScheduledWorkout_1.default;
User_1.default.associate({
    Workout: Workout_1.default,
    Exercise: Exercise_1.default,
    ScheduledWorkout: ScheduledWorkout_1.default,
});
Workout_1.default.associate({
    User: User_1.default,
    Exercise: Exercise_1.default,
    Workout_exercises: Workout_exercises_1.default,
    ScheduledWorkout: ScheduledWorkout_1.default,
});
Exercise_1.default.associate({
    User: User_1.default,
    Workout: Workout_1.default,
    Workout_exercises: Workout_exercises_1.default,
});
ScheduledWorkout_1.default.associate({
    User: User_1.default,
    Workout: Workout_1.default,
});
