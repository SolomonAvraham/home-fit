import request from "supertest";
import { expect } from "chai";
import app from "../../../src/index";
import { Exercise, sequelize } from "../../../src/models";
import { describe, it, beforeEach } from "mocha";
import generateToken from "../../utils/generateToken";

let token: string;
let exerciseId: string;

describe("Exercise Controller", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });

    const exercise = await Exercise.create({
      name: "Push-up",
      description: "A basic push-up exercise",
      muscleGroup: "Chest",
      media: "pushup.mp4",
    });

    exerciseId = exercise.id;

    // Create a user object with all required properties
    const user = {
      id: "test-user-id",
      email: "test@example.com",
      name: "Test User",
      password: "password123",
    };

    // Generate a token using the complete user object
    token = generateToken(user);
  });

  it("should create an exercise", async () => {
    const res = await request(app)
      .post("/api/exercises/createExercise")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Squat",
        description: "A basic squat exercise",
        muscleGroup: "Legs",
        media: "squat.mp4",
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
    expect(res.body.name).to.equal("Squat");
  });

  it("should get all exercises", async () => {
    const res = await request(app)
      .get("/api/exercises/all")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(1);
  });

  it("should get an exercise by ID", async () => {
    const res = await request(app)
      .get(`/api/exercises/getExerciseById/${exerciseId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("id");
    expect(res.body.name).to.equal("Push-up");
  });

  it("should return 404 if exercise not found", async () => {
    const res = await request(app)
      .get(
        `/api/exercises/getExerciseById/00000000-0000-0000-0000-000000000000`
      )
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(404);
    expect(res.body.message).to.equal("Exercise not found");
  });

  it("should return 400 for invalid UUID format", async () => {
    const res = await request(app)
      .get(`/api/exercises/getExerciseById/invalid-uuid`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal("Invalid UUID format");
  });

  it("should update an exercise", async () => {
    const res = await request(app)
      .put(`/api/exercises/updateExercise/${exerciseId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Push-up" });

    expect(res.status).to.equal(200);
    expect(res.body.name).to.equal("Updated Push-up");
  });

  it("should return 404 if exercise to update not found", async () => {
    const res = await request(app)
      .put(`/api/exercises/updateExercise/00000000-0000-0000-0000-000000000000`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Push-up" });

    expect(res.status).to.equal(404);
    expect(res.body.message).to.equal("Exercise not found");
  });

  it("should return 400 for invalid UUID format when updating", async () => {
    const res = await request(app)
      .put(`/api/exercises/updateExercise/invalid-uuid`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Push-up" });

    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal("Invalid UUID format");
  });

  it("should delete an exercise", async () => {
    const res = await request(app)
      .delete(`/api/exercises/deleteExercise/${exerciseId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(204);
  });

  it("should return 404 if exercise to delete not found", async () => {
    const res = await request(app)
      .delete(
        `/api/exercises/deleteExercise/00000000-0000-0000-0000-000000000000`
      )
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(404);
    expect(res.body.message).to.equal("Exercise not found");
  });

  it("should return 400 for invalid UUID format when deleting", async () => {
    const res = await request(app)
      .delete(`/api/exercises/deleteExercise/invalid-uuid`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal("Invalid UUID format");
  });
});
