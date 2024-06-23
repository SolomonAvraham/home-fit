import { Router } from "express";
import NotificationController from "../controllers/notificationController";

const router = Router();

router.post("/create", NotificationController.createNotification);
router.get("/user/:userId", NotificationController.getNotificationsByUserId);
router.put("/markAsRead/:id", NotificationController.markAsRead);

export default router;
