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
const Progress_1 = __importDefault(require("../models/Progress"));
class ProgressService {
    createProgress(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Progress_1.default.create(data);
        });
    }
    getProgressById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Progress_1.default.findByPk(id);
        });
    }
    getAllProgress() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Progress_1.default.findAll();
        });
    }
    updateProgress(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const progress = yield Progress_1.default.findByPk(id);
            if (!progress) {
                return null;
            }
            return progress.update(data);
        });
    }
    deleteProgress(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Progress_1.default.destroy({ where: { id } });
        });
    }
    trackProgress(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Example logic: Save progress data to the database
            const progress = Object.assign({ id: 1 }, data); // Simulate database save
            return progress;
        });
    }
}
exports.default = new ProgressService();
