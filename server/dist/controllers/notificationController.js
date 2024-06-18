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
const notificationService_1 = __importDefault(require("../services/notificationService"));
class NotificationController {
    static createNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("NotificationController ~ createNotification ~ data:", req.body);
                const notification = yield notificationService_1.default.createNotification(req.body);
                res.status(201).json(notification);
            }
            catch (error) {
                console.error("Controller error:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getNotificationsByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const notifications = yield notificationService_1.default.getNotificationsByUserId(userId);
                res.status(200).json(notifications);
            }
            catch (error) {
                console.error("Controller error:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static markAsRead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log("NotificationController ~ markAsRead ~ id:", id);
                const notification = yield notificationService_1.default.markAsRead(id);
                res.status(200).json(notification);
            }
            catch (error) {
                console.error("Controller error:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.default = NotificationController;
