import { Router } from "express";
import NotificationController from "../controllers/notificationController";

const router = Router();

router.post("/", NotificationController.createNotification);
router.get(
  "/user/:userId",
  NotificationController.getNotificationsByUserId
);
router.patch("/:id/read", NotificationController.markAsRead);

export default router;
