import { Request, Response } from "express";
import NotificationService from "../services/notificationService";
import { validate as validateUUID } from "uuid";

export default class NotificationController {
  static async createNotification(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      console.log(
        "NotificationController ~ createNotification ~ data:",
        req.body
      );
      const { userId, message } = req.body;
      if (!userId || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const notification = await NotificationService.createNotification(
        req.body
      );
      return res.status(201).json(notification);
    } catch (error) {
      console.error("Controller error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getNotificationsByUserId(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { userId } = req.params;
      const notifications = await NotificationService.getNotificationsByUserId(
        userId
      );
      return res.status(200).json(notifications);
    } catch (error) {
      console.error("Controller error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async markAsRead(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      console.log("NotificationController ~ markAsRead ~ id:", id);
      if (!validateUUID(id)) {
        return res.status(400).json({ error: "Invalid UUID format" });
      }
      const notification = await NotificationService.markAsRead(id);
      return res.status(200).json(notification);
    } catch (error) {
      console.error("Controller error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
