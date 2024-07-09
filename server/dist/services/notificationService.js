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
const index_1 = require("../models/index");
class NotificationService {
    static createNotification(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(data.userId)) {
                throw new Error("Invalid UUID format for userId");
            }
            const user = yield index_1.User.findByPk(data.userId);
            if (!user) {
                throw new Error("User not found");
            }
            return Notification_1.default.create(Object.assign(Object.assign({}, data), { id: (0, uuid_1.v4)() }));
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
            if (!(0, uuid_1.validate)(notificationId)) {
                throw new Error("Invalid UUID format for notificationId");
            }
            const notification = yield Notification_1.default.findByPk(notificationId);
            if (!notification) {
                throw new Error("Notification not found");
            }
            notification.read = true;
            yield notification.save();
            return notification;
        });
    }
}
exports.default = NotificationService;
