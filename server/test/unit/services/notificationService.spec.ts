import { expect } from "chai";
import { sequelize } from "../../../src/models";
import { describe, it, before, beforeEach } from "mocha";
import NotificationService from "../../../src/services/notificationService";
import Notification from "../../../src/models/Notification";
import User from "../../../src/models/User";
import { v4 as uuidv4 } from "uuid";

describe("NotificationService Unit Tests", () => {
  let userId: string;

  before(async () => {
    await sequelize.sync({ force: true });

    // Create a dummy user
    const user = await User.create({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    userId = user.id;
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });

    // Re-create the dummy user
    const user = await User.create({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    userId = user.id;
  });

  describe("createNotification", () => {
    it("should create a notification", async () => {
      const notificationData = {
        userId,
        message: "Test notification",
        read: false,
      };

      const notification = await NotificationService.createNotification(
        notificationData
      );

      expect(notification).to.have.property("id");
      expect(notification).to.have.property("userId", userId);
      expect(notification).to.have.property("message", "Test notification");
      expect(notification).to.have.property("read", false);
    });

    it("should throw an error for invalid userId format", async () => {
      const invalidUserId = "invalid-uuid";

      try {
        await NotificationService.createNotification({
          userId: invalidUserId,
          message: "Test notification",
          read: false,
        });
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Invalid UUID format for userId");
        }
      }
    });

    it("should throw an error if user is not found", async () => {
      const nonExistentUserId = uuidv4();

      try {
        await NotificationService.createNotification({
          userId: nonExistentUserId,
          message: "Test notification",
          read: false,
        });
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("User not found");
        }
      }
    });
  });

  describe("getNotificationsByUserId", () => {
    it("should get notifications by user id", async () => {
      const notificationData = {
        userId,
        message: "Test notification",
        read: false,
      };

      await NotificationService.createNotification(notificationData);

      const notifications = await NotificationService.getNotificationsByUserId(
        userId
      );

      expect(notifications).to.be.an("array");
      expect(notifications.length).to.equal(1);
    });

    it("should return an empty array if no notifications are found", async () => {
      const nonExistentUserId = uuidv4();

      const notifications = await NotificationService.getNotificationsByUserId(
        nonExistentUserId
      );

      expect(notifications).to.be.an("array");
      expect(notifications.length).to.equal(0);
    });
  });

  describe("markAsRead", () => {
    it("should mark a notification as read", async () => {
      const notificationData = {
        userId,
        message: "Test notification",
        read: false,
      };

      const createdNotification = await NotificationService.createNotification(
        notificationData
      );

      const updatedNotification = await NotificationService.markAsRead(
        createdNotification.id
      );

      expect(updatedNotification).to.have.property("read", true);
    });

    it("should throw an error for invalid notificationId format", async () => {
      const invalidNotificationId = "invalid-uuid";

      try {
        await NotificationService.markAsRead(invalidNotificationId);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal(
            "Invalid UUID format for notificationId"
          );
        }
      }
    });

    it("should throw an error if notification is not found", async () => {
      const nonExistentNotificationId = uuidv4();

      try {
        await NotificationService.markAsRead(nonExistentNotificationId);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Notification not found");
        }
      }
    });
  });
});
