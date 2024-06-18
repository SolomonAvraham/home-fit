import { v4 as uuidv4, validate as validateUUID } from "uuid";
import Notification, { NotificationData } from "../models/Notification";
import User from "../models/User";

class NotificationService {
  static async createNotification(
    data: NotificationData
  ): Promise<Notification> {
    console.log("NotificationService ~ createNotification ~ data:", data);

    // Validate UUID format
    if (!validateUUID(data.userId)) {
      console.error("Invalid UUID format for userId:", data.userId); // Improved logging
      throw new Error("Invalid UUID format for userId");
    }

    // Check if the user exists
    const user = await User.findByPk(data.userId);
    if (!user) {
      console.error("User not found:", data.userId);
      throw new Error("User not found");
    }

    try {
      const notification = await Notification.create({
        id: uuidv4(),
        userId: data.userId,
        message: data.message,
        read: data.read ?? false,
        createdAt: data.createdAt ?? new Date(),
        updatedAt: data.updatedAt ?? new Date(),
      });
      return notification;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Service error:", error.message);
      }
      throw new Error("Could not create notification");
    }
  }

  static async getNotificationsByUserId(
    userId: string
  ): Promise<Notification[]> {
    try {
      const notifications = await Notification.findAll({ where: { userId } });
      return notifications;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Service error:", error.message);
      }
      throw new Error("Could not fetch notifications");
    }
  }

  static async markAsRead(notificationId: string): Promise<Notification> {
    // Validate UUID format
    if (!validateUUID(notificationId)) {
      console.error("Invalid UUID format for notificationId:", notificationId);
      throw new Error("Invalid UUID format for notificationId");
    }

    try {
      const notification = await Notification.findByPk(notificationId);

      if (!notification) {
        console.error("Notification not found:", notificationId);
        throw new Error("Notification not found");
      }

      notification.read = true;

      await notification.save();
      return notification;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Service error:", error.message);
      } else {
        console.error("Service error:", error);
      }
      throw new Error("Could not mark notification as read");
    }
  }
}

export default NotificationService;
