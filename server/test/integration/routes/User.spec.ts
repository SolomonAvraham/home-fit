import {
  createTestEntities,
  testUserId,
  testWorkoutId,
  cleanupTestEntities,
} from "../../utils/generateTestEntities";
import generateToken from "../../utils/generateToken";
import { describe, it, before } from "mocha";
import request from "supertest";
import app from "../../../src/index";
import { expect } from "chai";

describe("User Controller", () => {
  let token: string;

  before(async () => {
    await createTestEntities();
    token = generateToken({
      id: testUserId,
      email: "testuser@example.com",
      name: "Test User",
      password: "password123",
    });
  });

    after(async () => {
      await cleanupTestEntities(); // Ensure proper cleanup after tests
    });
  
  
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
    expect(res.body).to.have.property("error");
  });

  it("should return 400 for invalid UUID format", async () => {
    const res = await request(app)
      .get("/api/users/getUserById/invalid-uuid")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message", "Invalid UUID format");
  });

  it("should return 400 for invalid UUID format when updating", async () => {
    const res = await request(app)
      .put("/api/users/updateUser/invalid-uuid")
      .send({ name: "Updated User" })
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message", "Invalid UUID format");
  });

   it("should delete a user", async () => {
     console.log("Deleting user with ID:", testUserId); // Added logging
     const res = await request(app)
       .delete(`/api/users/deleteUser/${testUserId}`)
       .set("Authorization", `Bearer ${token}`);
     console.log("Response status:", res.status); // Added logging
     console.log("Response body:", res.body); // Added logging
     expect(res.status).to.equal(204);
   });

  
});
