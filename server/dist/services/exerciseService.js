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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const index_1 = require("../models/index");
class ExerciseService {
    static createExercise(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exercise = yield index_1.Exercise.create(data);
                return exercise;
            }
            catch (error) {
                console.error("Create Exercise Service Error:", error);
                throw new Error("Failed to create exercise");
            }
        });
    }
    static getAllExercises() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exercises = yield index_1.Exercise.findAll();
                return exercises;
            }
            catch (error) {
                console.error("Get All Exercises Service Error:", error);
                throw new Error("Failed to fetch exercises");
            }
        });
    }
    static getExerciseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
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
                throw new Error("Failed to fetch exercise");
            }
        });
    }
    static updateExercise(id, data) {
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
                throw new Error("Failed to update exercise");
            }
        });
    }
    static deleteExercise(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, uuid_1.validate)(id)) {
                    throw new Error("Invalid UUID format");
                }
                const exercise = yield index_1.Exercise.findByPk(id);
                if (!exercise) {
                    throw new Error("Exercise not found");
                }
                yield exercise.destroy();
                return exercise;
            }
            catch (error) {
                console.error("Delete Exercise Service Error:", error);
                throw new Error("Failed to delete exercise");
            }
        });
    }
}
exports.default = ExerciseService;
