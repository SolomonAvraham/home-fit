import request from "supertest";
import { expect } from "chai";
import app from "../../../src/index";
import {
  createTestEntities,
  testUserId,
} from "../../utils/generateTestEntities";
import generateToken from "../../utils/generateToken";
import { describe, it, before } from "mocha";

let token: string;

describe("Notification Controller", () => {
  before(async () => {
    await createTestEntities();
    token = generateToken({
      id: testUserId,
      email: "testuser@example.com",
      name: "Test User",
      password: "password123",
    });
  });

  it("should create a notification", async () => {
    const res = await request(app)
      .post("/api/notifications/create")
      .set("Authorization", `Bearer ${token}`)
      .send({ userId: testUserId, message: "Test Notification" });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
  });

  it("should not create a notification with missing fields", async () => {
    const res = await request(app)
      .post("/api/notifications/create")
      .set("Authorization", `Bearer ${token}`)
      .send({ message: "Test Notification" });

    expect(res.status).to.equal(400);
  });

  it("should mark a notification as read", async () => {
    const notification = await request(app)
      .post("/api/notifications/create")
      .set("Authorization", `Bearer ${token}`)
      .send({ userId: testUserId, message: "Test Notification" });

    const res = await request(app)
      .put(`/api/notifications/markAsRead/${notification.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.read).to.be.true;
  });

  it("should return 400 for invalid UUID format when marking as read", async () => {
    const res = await request(app)
      .put(`/api/notifications/markAsRead/invalid-uuid`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(400);
  });
});
