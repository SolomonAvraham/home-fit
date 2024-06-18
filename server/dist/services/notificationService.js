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
const uuid_1 = require("uuid");
const Notification_1 = __importDefault(require("../models/Notification"));
const User_1 = __importDefault(require("../models/User"));
class NotificationService {
    static createNotification(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            console.log("NotificationService ~ createNotification ~ data:", data);
            // Validate UUID format
            if (!(0, uuid_1.validate)(data.userId)) {
                console.error("Invalid UUID format for userId:", data.userId); // Improved logging
                throw new Error("Invalid UUID format for userId");
            }
            // Check if the user exists
            const user = yield User_1.default.findByPk(data.userId);
            if (!user) {
                console.error("User not found:", data.userId);
                throw new Error("User not found");
            }
            try {
                const notification = yield Notification_1.default.create({
                    id: (0, uuid_1.v4)(),
                    userId: data.userId,
                    message: data.message,
                    read: (_a = data.read) !== null && _a !== void 0 ? _a : false,
                    createdAt: (_b = data.createdAt) !== null && _b !== void 0 ? _b : new Date(),
                    updatedAt: (_c = data.updatedAt) !== null && _c !== void 0 ? _c : new Date(),
                });
                return notification;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Service error:", error.message);
                }
                throw new Error("Could not create notification");
            }
        });
    }
    static getNotificationsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifications = yield Notification_1.default.findAll({ where: { userId } });
                return notifications;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Service error:", error.message);
                }
                throw new Error("Could not fetch notifications");
            }
        });
    }
    static markAsRead(notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate UUID format
            if (!(0, uuid_1.validate)(notificationId)) {
                console.error("Invalid UUID format for notificationId:", notificationId);
                throw new Error("Invalid UUID format for notificationId");
            }
            try {
                const notification = yield Notification_1.default.findByPk(notificationId);
                if (!notification) {
                    console.error("Notification not found:", notificationId);
                    throw new Error("Notification not found");
                }
                notification.read = true;
                yield notification.save();
                return notification;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Service error:", error.message);
                }
                else {
                    console.error("Service error:", error);
                }
                throw new Error("Could not mark notification as read");
            }
        });
    }
}
exports.default = NotificationService;
