import request from "supertest";
import { expect } from "chai";
import app from "../../../src/index";
import {
  createTestEntities,
  testUserId,
  testWorkoutPlanId,
} from "../../utils/generateTestEntities";
import generateToken from "../../utils/generateToken";
import { describe, it, before } from "mocha";
import { v4 as uuidv4 } from "uuid";

let token: string;
let workoutId: string;

describe("Workout Controller", () => {
  before(async () => {
    await createTestEntities();
    token = generateToken({
      id: testUserId,
      email: "testuser@example.com",
      name: "Test User",
      password: "password123",
    });
  });

  it("should create a workout", async () => {
    const res = await request(app)
      .post("/api/workouts/createWorkout")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: testUserId,
        workoutPlanId: testWorkoutPlanId,
        date: new Date(),
        duration: 60,
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
    workoutId = res.body.id; // Store the created workout ID for further tests
  });

  it("should get a workout by ID", async () => {
    const res = await request(app)
      .get(`/api/workouts/WorkoutById/${workoutId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("id");
  });

  it("should return 404 if workout not found", async () => {
    const res = await request(app)
      .get(`/api/workouts/WorkoutById/${uuidv4()}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(404);
  });

  it("should return 400 for invalid UUID format", async () => {
    const res = await request(app)
      .get("/api/workouts/WorkoutById/invalid-uuid-format")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(400);
  });

  it("should update a workout", async () => {
    const res = await request(app)
      .put(`/api/workouts/updateWorkout/${workoutId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ duration: 90 });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("duration", 90);
  });

  it("should return 404 if workout to update not found", async () => {
    const res = await request(app)
      .put(`/api/workouts/updateWorkout/${uuidv4()}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ duration: 90 });

    expect(res.status).to.equal(404);
  });

  it("should return 400 for invalid UUID format when updating", async () => {
    const res = await request(app)
      .put("/api/workouts/updateWorkout/invalid-uuid-format")
      .set("Authorization", `Bearer ${token}`)
      .send({ duration: 90 });

    expect(res.status).to.equal(400);
  });

  it("should delete a workout", async () => {
    const res = await request(app)
      .delete(`/api/workouts/deleteWorkout/${workoutId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(204);
  });

  it("should return 404 if workout to delete not found", async () => {
    const res = await request(app)
      .delete(`/api/workouts/deleteWorkout/${uuidv4()}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(404);
  });

  it("should return 400 for invalid UUID format when deleting", async () => {
    const res = await request(app)
      .delete("/api/workouts/deleteWorkout/invalid-uuid-format")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(400);
  });
});
