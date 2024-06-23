import { v4 as uuidv4, validate as validateUUID } from "uuid";
import Notification, { NotificationData } from "../models/Notification";
import User from "../models/User";

class NotificationService {
  static async createNotification(data: NotificationData) {
    if (!validateUUID(data.userId)) {
      throw new Error("Invalid UUID format for userId");
    }
    const user = await User.findByPk(data.userId);
    if (!user) {
      throw new Error("User not found");
    }
    return Notification.create({
      ...data,
      id: uuidv4(),
    });
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
    if (!validateUUID(notificationId)) {
      throw new Error("Invalid UUID format for notificationId");
    }
    const notification = await Notification.findByPk(notificationId);
    if (!notification) {
      throw new Error("Notification not found");
    }
    notification.read = true;
    await notification.save();
    return notification;
  }
}

export default NotificationService;
