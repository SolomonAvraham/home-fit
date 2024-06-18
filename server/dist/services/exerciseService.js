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
const Exercise_1 = __importDefault(require("../models/Exercise"));
class ExerciseService {
    static createExercise(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return Exercise_1.default.create(data);
        });
    }
    static getAllExercises() {
        return __awaiter(this, void 0, void 0, function* () {
            return Exercise_1.default.findAll();
        });
    }
    static getExerciseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Exercise_1.default.findByPk(id);
        });
    }
    static updateExercise(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const exercise = yield Exercise_1.default.findByPk(id);
            if (!exercise) {
                return null;
            }
            return exercise.update(data);
        });
    }
    static deleteExercise(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exercise = yield Exercise_1.default.findByPk(id);
            if (!exercise) {
                return null;
            }
            yield exercise.destroy();
            return exercise;
        });
    }
}
exports.default = ExerciseService;
