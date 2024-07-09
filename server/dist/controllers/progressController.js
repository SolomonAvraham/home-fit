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
const progressService_1 = __importDefault(require("../services/progressService"));
const uuid_1 = require("uuid");
class ProgressController {
    static createProgress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const progress = yield progressService_1.default.createProgress(req.body);
                return res.status(201).json(progress);
            }
            catch (error) {
                console.error("Error in createProgress:", error.message);
                return res
                    .status(400)
                    .json({ message: "Failed to create progress", error: error.message });
            }
        });
    }
    static getAllProgress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const progress = yield progressService_1.default.getAllProgress();
                return res.status(200).json(progress);
            }
            catch (error) {
                console.error("Error in getAllProgress:", error.message);
                return res
                    .status(500)
                    .json({ message: "Failed to get progress", error: error.message });
            }
        });
    }
    static getProgressById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!(0, uuid_1.validate)(id)) {
                    return res.status(400).json({ message: "Invalid UUID format" });
                }
                const progress = yield progressService_1.default.getProgressById(id);
                if (!progress) {
                    return res.status(404).json({ message: "Progress not found" });
                }
                return res.status(200).json(progress);
            }
            catch (error) {
                console.error("Error in getProgressById:", error.message);
                return res
                    .status(400)
                    .json({ message: "Failed to get progress", error: error.message });
            }
        });
    }
    static updateProgress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!(0, uuid_1.validate)(id)) {
                    return res.status(400).json({ message: "Invalid UUID format" });
                }
                const progress = yield progressService_1.default.updateProgress(id, req.body);
                if (!progress) {
                    return res.status(404).json({ message: "Progress not found" });
                }
                return res.status(200).json(progress);
            }
            catch (error) {
                console.error("Error in updateProgress:", error.message);
                return res
                    .status(400)
                    .json({ message: "Failed to update progress", error: error.message });
            }
        });
    }
    static deleteProgress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!(0, uuid_1.validate)(id)) {
                    return res.status(400).json({ message: "Invalid UUID format" });
                }
                const deleted = yield progressService_1.default.deleteProgress(id);
                if (!deleted) {
                    return res.status(404).json({ message: "Progress not found" });
                }
                return res.status(204).send();
            }
            catch (error) {
                console.error("Error in deleteProgress:", error.message);
                return res
                    .status(400)
                    .json({ message: "Failed to delete progress", error: error.message });
            }
        });
    }
}
exports.default = ProgressController;
