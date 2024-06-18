"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificationController_1 = __importDefault(require("../controllers/notificationController"));
const router = (0, express_1.Router)();
router.post("/", notificationController_1.default.createNotification);
router.get("/user/:userId", notificationController_1.default.getNotificationsByUserId);
router.patch("/:id/read", notificationController_1.default.markAsRead);
exports.default = router;
