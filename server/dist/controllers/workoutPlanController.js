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
const workoutPlanService_1 = __importDefault(require("../services/workoutPlanService"));
class WorkoutPlanController {
    static createWorkoutPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workoutPlan = yield workoutPlanService_1.default.createWorkoutPlan(req.body);
                res.status(201).json(workoutPlan);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                console.log(error);
            }
        });
    }
    static getAllWorkoutPlans(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workoutPlans = yield workoutPlanService_1.default.getAllWorkoutPlans();
                res.status(200).json(workoutPlans);
            }
            catch (error) {
                console.error("Controller error:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getWorkoutPlanById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workoutPlan = yield workoutPlanService_1.default.getWorkoutPlanById(req.params.id);
                if (!workoutPlan) {
                    return res.status(404).json({ message: "Workout plan not found" });
                }
                res.status(200).json(workoutPlan);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                console.log(error);
            }
        });
    }
    static updateWorkoutPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workoutPlan = yield workoutPlanService_1.default.updateWorkoutPlan(req.params.id, req.body);
                if (!workoutPlan) {
                    return res.status(404).json({ message: "Workout plan not found" });
                }
                res.status(200).json(workoutPlan);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                console.log(error);
            }
        });
    }
    static deleteWorkoutPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield workoutPlanService_1.default.deleteWorkoutPlan(req.params.id);
                if (!deleted) {
                    return res.status(404).json({ message: "Workout plan not found" });
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
exports.default = WorkoutPlanController;
