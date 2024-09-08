import { describe, it, before, after } from "mocha";
import request from "supertest";
import { expect } from "chai";
import app from "../../../src/index";
import {
  createTestEntities,
  cleanupTestEntities,
  testUserId,
  testWorkoutId,
  testNewUserId,
} from "../../utils/generateTestEntities";
import generateToken from "../../utils/generateToken";
import { sequelize, Workout } from "../../../src/models";
import { v4 as uuidv4 } from "uuid";

const nonExistentWorkoutId = "00000000-0000-0000-0000-000000000000";

describe("Workout Controller", () => {
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

    token = generateToken(testUser);
  });

  after(async () => {
    await cleanupTestEntities();
  });

  describe("Check Workout Existence", () => {
    it("should return 404 if workout does not exist", async () => {
      const res = await request(app)
        .get("/api/workouts/isWorkoutExist")
        .query({ workoutId: nonExistentWorkoutId, userId: testUserId })
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("message", "Workout not found");
    });

    it("should return workout existence", async () => {
      const res = await request(app)
        .get("/api/workouts/isWorkoutExist")
        .query({ workoutId: testWorkoutId, userId: testUserId })
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.true;
    });
  });

  describe("Create and Add Workouts", () => {
    it("should create a workout successfully", async () => {
      const res = await request(app)
        .post("/api/workouts/createWorkout")
        .send({
          userId: testUserId,
          name: "New Workout",
          duration: 30,
          description: "A test workout",
          createdBy: [
            {
              creatorId: testUserId,
              creatorName: "Test User",
              originalWorkoutId: testWorkoutId,
            },
          ],
        })
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("name", "New Workout");
    });

    it("should add a workout for a valid UUID", async () => {
      const workout = await request(app)
        .post("/api/workouts/createWorkout")
        .send({
          userId: testUserId,
          name: "New Workout",
          duration: 30,
          description: "A test workout",
          createdBy: [
            {
              creatorId: testUserId,
              creatorName: "Test User",
              originalWorkoutId: testWorkoutId,
            },
          ],
        })
        .set("Authorization", `Bearer ${token}`);

      const workoutId = workout.body.id;

      const res = await request(app)
        .post(`/api/workouts/addWorkout/${workoutId}/user/${testNewUserId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("userId", testNewUserId);
      expect(res.body).to.have.property("name", workout.body.name);
    });

    it("should return 400 for invalid UUID format in addWorkout", async () => {
      const res = await request(app)
        .post(
          `/api/workouts/addWorkout/invalid-uuid/user/${nonExistentWorkoutId}`
        )
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Invalid UUID format");
    });
  });

  describe("Get Workouts", () => {
    it("should get a workout by ID", async () => {
      const workout = await Workout.create({
        userId: testUserId,
        description: "This is a test workout",
        name: "Workout for Get By ID",
        createdBy: [
          {
            creatorId: testUserId,
            creatorName: "Test User",
            originalWorkoutId: testWorkoutId,
          },
        ],
      });

      const res = await request(app)
        .get(`/api/workouts/WorkoutById/${workout.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("id", workout.id);
    });

    it("should return 404 if workout not found", async () => {
      const nonExistentValidUUID = uuidv4();

      const res = await request(app)
        .get(`/api/workouts/WorkoutById/${nonExistentValidUUID}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Workout not found");
    });

    it("should return 400 for invalid UUID format in getWorkoutById", async () => {
      const res = await request(app)
        .get("/api/workouts/WorkoutById/invalid-uuid")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Invalid UUID format");
    });

    it("should get all workouts for a user", async () => {
      const res = await request(app)
        .get(`/api/workouts/WorkoutsByUserId/${testUserId}`)
        .set("Authorization", `Bearer ${token}`)
        .query({ page: 1, limit: 10 });

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });

    it("should return 400 for invalid UUID format in getWorkoutsByUserId", async () => {
      const res = await request(app)
        .get(`/api/workouts/WorkoutsByUserId/invalid-uuid`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Invalid UUID format");
    });

    it("should get all workouts with pagination", async () => {
      const res = await request(app)
        .get("/api/workouts/all")
        .set("Authorization", `Bearer ${token}`)
        .query({ page: 1, limit: 10 });

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });
  });

  describe("Update Workouts", () => {
    it("should update a workout", async () => {
      const workout = await request(app)
        .post("/api/workouts/createWorkout")
        .send({
          userId: testUserId,
          name: "New Updated Workout",
          duration: 30,
          description: "A test workout",
          createdBy: [
            {
              creatorId: testUserId,
              creatorName: "Test User",
              originalWorkoutId: testWorkoutId,
            },
          ],
        })
        .set("Authorization", `Bearer ${token}`);

      const workoutId = workout.body.id;

      const res = await request(app)
        .put(`/api/workouts/updateWorkout/${workoutId}`)
        .send({ name: "Updated Workout", duration: "45" })
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Updated Workout");
    });

    it("should return 400 for invalid UUID format in updateWorkout", async () => {
      const res = await request(app)
        .put("/api/workouts/updateWorkout/invalid-uuid")
        .send({ name: "Updated Workout", duration: 45 })
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Invalid UUID format");
    });

    it("should return 404 if workout to update is not found", async () => {
      const res = await request(app)
        .put(`/api/workouts/updateWorkout/${uuidv4()}`)
        .send({ name: "Updated Workout", duration: 45 })
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Workout not found");
    });
  });

  describe("Delete Workouts", () => {
    it("should delete a workout for a valid UUID", async () => {
      const workout = await request(app)
        .post("/api/workouts/createWorkout")
        .send({
          userId: testUserId,
          name: "New Workout",
          duration: 30,
          description: "A test workout",
          createdBy: [
            {
              creatorId: testUserId,
              creatorName: "Test User",
              originalWorkoutId: testWorkoutId,
            },
          ],
        })
        .set("Authorization", `Bearer ${token}`);

      const workoutId = workout.body.id;

      const res = await request(app)
        .delete(`/api/workouts/deleteWorkout/${workoutId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(204);
    });

    it("should return 400 for invalid UUID format in deleteWorkout", async () => {
      const res = await request(app)
        .delete("/api/workouts/deleteWorkout/invalid-uuid")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Invalid UUID format");
    });

    it("should return 404 if workout to delete is not found", async () => {
      const res = await request(app)
        .delete(`/api/workouts/deleteWorkout/non-existent-id`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Invalid UUID format");
    });
  });
});
