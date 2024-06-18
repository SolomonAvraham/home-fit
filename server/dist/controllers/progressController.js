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
class ProgressController {
    static createProgress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const progress = yield progressService_1.default.createProgress(req.body);
                res.status(201).json(progress);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                console.log(error);
            }
        });
    }
    static getAllProgress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const progress = yield progressService_1.default.getAllProgress();
                res.status(200).json(progress);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                console.log(error);
            }
        });
    }
    static getProgressById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const progress = yield progressService_1.default.getProgressById(req.params.id);
                if (!progress) {
                    return res.status(404).json({ message: "Progress not found" });
                }
                res.status(200).json(progress);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                console.log(error);
            }
        });
    }
    static updateProgress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const progress = yield progressService_1.default.updateProgress(req.params.id, req.body);
                if (!progress) {
                    return res.status(404).json({ message: "Progress not found" });
                }
                res.status(200).json(progress);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                console.log(error);
            }
        });
    }
    static deleteProgress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield progressService_1.default.deleteProgress(req.params.id);
                if (!deleted) {
                    return res.status(404).json({ message: "Progress not found" });
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
exports.default = ProgressController;
