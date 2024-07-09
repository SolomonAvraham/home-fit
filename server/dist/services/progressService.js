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
const index_1 = require("../models/index");
const uuid_1 = require("uuid");
class ProgressService {
    createProgress(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const progress = yield index_1.Progress.create(data);
                return progress;
            }
            catch (error) {
                console.error("Create Progress Service Error:", error);
                throw new Error("Failed to create progress");
            }
        });
    }
    getProgressById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, uuid_1.validate)(id)) {
                    throw new Error("Invalid UUID format");
                }
                const progress = yield index_1.Progress.findByPk(id);
                if (!progress) {
                    throw new Error("Progress not found");
                }
                return progress;
            }
            catch (error) {
                console.error("Get Progress By ID Service Error:", error);
                throw new Error("Failed to fetch progress");
            }
        });
    }
    getAllProgress() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const progress = yield index_1.Progress.findAll();
                return progress;
            }
            catch (error) {
                console.error("Get All Progress Service Error:", error);
                throw new Error("Failed to fetch progress");
            }
        });
    }
    updateProgress(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, uuid_1.validate)(id)) {
                    throw new Error("Invalid UUID format");
                }
                const progress = yield index_1.Progress.findByPk(id);
                if (!progress) {
                    throw new Error("Progress not found");
                }
                const updatedProgress = yield progress.update(data);
                return updatedProgress;
            }
            catch (error) {
                console.error("Update Progress Service Error:", error);
                throw new Error("Failed to update progress");
            }
        });
    }
    deleteProgress(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, uuid_1.validate)(id)) {
                    throw new Error("Invalid UUID format");
                }
                const progress = yield index_1.Progress.findByPk(id);
                if (!progress) {
                    return 0; // Indicate progress not found
                }
                yield progress.destroy();
                return 1; // Indicate progress was deleted
            }
            catch (error) {
                console.error("Delete Progress Service Error:", error);
                throw new Error("Failed to delete progress");
            }
        });
    }
}
exports.default = new ProgressService();
