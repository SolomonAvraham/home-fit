import { Request, Response } from "express";
import NotificationService from "../services/notificationService";

export default class NotificationController {
  static async createNotification(req: Request, res: Response): Promise<void> {
    try {
      console.log(
        "NotificationController ~ createNotification ~ data:",
        req.body
      );
      const notification = await NotificationService.createNotification(
        req.body
      );
      res.status(201).json(notification);
    } catch (error) {
      console.error("Controller error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getNotificationsByUserId(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const notifications = await NotificationService.getNotificationsByUserId(
        userId
      );
      res.status(200).json(notifications);
    } catch (error) {
      console.error("Controller error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async markAsRead(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      console.log("NotificationController ~ markAsRead ~ id:", id);
      const notification = await NotificationService.markAsRead(id);
      res.status(200).json(notification);
    } catch (error) {
      console.error("Controller error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
