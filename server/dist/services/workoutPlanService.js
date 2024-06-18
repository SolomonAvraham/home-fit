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
const WorkoutPlan_1 = __importDefault(require("../models/WorkoutPlan"));
class WorkoutPlanService {
    createWorkoutPlan(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield WorkoutPlan_1.default.create(data);
        });
    }
    getWorkoutPlanById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield WorkoutPlan_1.default.findByPk(id);
        });
    }
    getAllWorkoutPlans() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workoutPlans = yield WorkoutPlan_1.default.findAll();
                return workoutPlans;
            }
            catch (error) {
                console.error("Service error:", error);
                throw new Error("Could not fetch workout plans");
            }
        });
    }
    updateWorkoutPlan(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield WorkoutPlan_1.default.update(data, { where: { id } });
        });
    }
    deleteWorkoutPlan(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield WorkoutPlan_1.default.destroy({ where: { id } });
        });
    }
}
exports.default = new WorkoutPlanService();
