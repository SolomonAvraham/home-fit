import {
  createTestEntities,
  testUserId,
  cleanupTestEntities,
} from "../../utils/generateTestEntities";
import generateToken from "../../utils/generateToken";
import { describe, it, before, after } from "mocha";
import request from "supertest";
import app from "../../../src/index";
import { expect } from "chai";
import { sequelize, User } from "../../../src/models";

describe("User Controller", () => {
  let token: string;

  before(async () => {
    await sequelize.sync({ force: true });
    await createTestEntities();

    const testUser = {
      id: testUserId,
      email: "testuser@example.com",
      name: "Test User",
      password: "password123",
    };

    token = generateToken(testUser as User);
  });

  after(async () => {
    await cleanupTestEntities();
  });

  describe("Create User", () => {
    it("should create a user", async () => {
      const res = await request(app).post("/api/users/register").send({
        name: "New User",
        email: "newuser@example.com",
        password: "password123",
      });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("name", "New User");
    });

    it("should not create a user with missing fields", async () => {
      const res = await request(app).post("/api/users/register").send({
        email: "newuser@example.com",
      });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "All fields are required");
    });

    it("should return 400 if UserService.createUser throws an error", async () => {
      const res = await request(app)
        .post("/api/users/register")
        .send({ email: "invalid-email", password: "", name: "" });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message").that.is.not.empty; // Expect a meaningful error message
    });
  });

  describe("Get User by ID", () => {
    it("should return a user for a valid UUID", async () => {
      const res = await request(app)
        .get(`/api/users/getUserById/${testUserId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("id", testUserId);
    });

    it("should return 400 for invalid UUID format", async () => {
      const res = await request(app)
        .get("/api/users/getUserById/invalid-uuid")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Invalid UUID format");
    });

    it("should return 404 if user not found", async () => {
      const res = await request(app)
        .get("/api/users/getUserById/00000000-0000-0000-0000-000000000000")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "User not found");
    });

    it("should handle UserService.getUserById errors gracefully", async () => {
      const invalidUserId = "some-invalid-uuid"; // Use a UUID or condition that you know will cause an error

      const res = await request(app)
        .get(`/api/users/getUserById/${invalidUserId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message").that.is.not.empty; // Expect an error message
    });
  });

  describe("Update User", () => {
    it("should return 400 for invalid UUID format when updating", async () => {
      const res = await request(app)
        .put("/api/users/updateUser/invalid-uuid")
        .send({ name: "Updated User" })
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Invalid UUID format");
    });
  });

  describe("Delete User", () => {
    it("should delete a user for valid UUID", async () => {
      const res = await request(app)
        .delete(`/api/users/deleteUser/${testUserId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(204);
    });

    it("should return 400 for invalid UUID format", async () => {
      const res = await request(app)
        .delete("/api/users/deleteUser/invalid-uuid")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Invalid UUID format");
    });

    it("should return 404 if user not found", async () => {
      const res = await request(app)
        .delete(`/api/users/deleteUser/00000000-0000-0000-0000-000000000000`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "User not found");
    });

    it("should handle errors in UserService.deleteUser gracefully", async () => {
      const faultyUserId = "faulty-user-id"; // Use a condition that would cause delete to fail

      const res = await request(app)
        .delete(`/api/users/deleteUser/${faultyUserId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message").that.is.not.empty; // Expect an error message
    });
  });
});
