import { describe, it, before, after } from "mocha";
import request from "supertest";
import { expect } from "chai";
import app from "../../../src/index"; // Adjust the path as needed
import {
  createTestEntities,
  cleanupTestEntities,
  testUserId,
  testExerciseId,
} from "../../utils/generateTestEntities";
import generateToken from "../../utils/generateToken";
import { Exercise } from "../../../src/models";
import { v4 as uuidv4 } from "uuid";

describe("Exercise Controller", () => {
  let token: string;

  before(async () => {
    await createTestEntities();

    const testUser = {
      id: testUserId,
      email: "testuser@example.com",
      name: "Test User",
      password: "password123",
    };

    token = generateToken(testUser);
  });

  after(async () => {
    await cleanupTestEntities();
  });

  describe("Create Exercise", () => {
    it("should create an exercise successfully", async () => {
      const res = await request(app)
        .post("/api/exercises/createExercise")
        .send({
          name: "New Exercise",
          sets: 3,
          reps: 10,
          description: "This is a test exercise",
          duration: 45,
          userId: testUserId,
          createdBy: [
            {
              creatorId: testUserId,
              creatorName: "Test User",
              originalExerciseId: testExerciseId,
            },
          ],
        })
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("name", "New Exercise");
      expect(res.body).to.have.property("sets", 3);
    });

    it("should return 400 if required fields are missing", async () => {
      const res = await request(app)
        .post("/api/exercises/createExercise")
        .send({
          sets: 3,
          reps: 10,
          userId: testUserId,
        })
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "All fields are required");
    });
  });

  describe("Get Exercises", () => {
    it("should get an exercise by ID", async () => {
      const exercise = await Exercise.create({
        name: "Test Exercise",
        sets: 3,
        reps: 10,
        description: "This is a test exercise",
        duration: 45,
        userId: testUserId,
        createdBy: [
          {
            creatorId: testUserId,
            creatorName: "Test User",
            originalExerciseId: testExerciseId,
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const res = await request(app)
        .get(`/api/exercises/getExerciseById/${exercise.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("id", exercise.id);
      expect(res.body).to.have.property("name", "Test Exercise");
    });

    it("should return 404 if exercise not found", async () => {
      const res = await request(app)
        .get(`/api/exercises/getExerciseById/${uuidv4()}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Exercise not found");
    });

    it("should return 400 for invalid UUID format", async () => {
      const res = await request(app)
        .get("/api/exercises/getExerciseById/invalid-uuid")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Invalid UUID format");
    });
  });

  describe("Update Exercise", () => {
    it("should update an exercise successfully", async () => {
      const exercise = await Exercise.create({
        name: "Test Upadte Exercise",
        sets: 3,
        reps: 10,
        description: "This is a test exercise",
        duration: 45,
        userId: testUserId,
        createdBy: [
          {
            creatorId: testUserId,
            creatorName: "Test User",
            originalExerciseId: testExerciseId,
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const res = await request(app)
        .put(`/api/exercises/updateExercise/${exercise.id}`)
        .send({ name: "Updated Exercise", sets: 5 })
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Updated Exercise");
      expect(res.body).to.have.property("sets", 5);
    });

    it("should return 404 if exercise to update is not found", async () => {
      const res = await request(app)
        .put(`/api/exercises/updateExercise/${uuidv4()}`)
        .send({ name: "Updated Exercise", sets: 5 })
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Exercise not found");
    });

    it("should return 400 for invalid UUID format in updateExercise", async () => {
      const res = await request(app)
        .put("/api/exercises/updateExercise/invalid-uuid")
        .send({ name: "Updated Exercise", sets: 5 })
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Invalid UUID format");
    });
  });

  describe("Delete Exercise", () => {
    it("should delete an exercise for a valid UUID", async () => {
      const exercise = await Exercise.create({
        name: "Test Upadte Exercise",
        sets: 3,
        reps: 10,
        description: "This is a test exercise",
        duration: 45,
        userId: testUserId,
        createdBy: [
          {
            creatorId: testUserId,
            creatorName: "Test User",
            originalExerciseId: testExerciseId,
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const res = await request(app)
        .delete(`/api/exercises/deleteExercise/${exercise.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(204);
    });

    it("should return 404 if exercise to delete is not found", async () => {
      const res = await request(app)
        .delete(`/api/exercises/deleteExercise/${uuidv4()}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Exercise not found");
    });

    it("should return 400 for invalid UUID format in deleteExercise", async () => {
      const res = await request(app)
        .delete("/api/exercises/deleteExercise/invalid-uuid")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Invalid UUID format");
    });
  });
});
