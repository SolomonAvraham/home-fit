import request from "supertest";
import { expect } from "chai";
import app from "../../../src/index";
import { WorkoutPlan, sequelize } from "../../../src/models";
import { describe, it, beforeEach, afterEach } from "mocha";
import generateToken from "../../utils/generateToken";
import {
  createTestEntities,
  cleanupTestEntities,
  testUserId,
} from "../../utils/generateTestEntities";

let token: string;
let workoutPlanId: string;

describe("Workout Plan Controller", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
    await createTestEntities();

    const workoutPlan = await WorkoutPlan.create({
      userId: testUserId,
      name: "Test Plan",
      description: "Test Description",
    });

    workoutPlanId = workoutPlan.id;

    const user = {
      id: testUserId,
      email: "test@example.com",
      name: "Test User",
      password: "password123",
    };

    token = generateToken(user);
  });

  afterEach(async () => {
    await cleanupTestEntities();
  });

  it("should return 400 for invalid UUID format", async () => {
    const res = await request(app)
      .get("/api/workout-Plans/getWorkoutPlanById/invalid-uuid-format")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("Invalid UUID format");
  });

  it("should return 400 for invalid UUID format when updating", async () => {
    const res = await request(app)
      .put(`/api/workout-Plans/updateWorkoutPlan/invalid-uuid`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Plan", description: "Updated Description" });

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("Invalid UUID format");
  });

  it("should return 400 for invalid UUID format when deleting", async () => {
    const res = await request(app)
      .delete(`/api/workout-Plans/deleteWorkoutPlan/invalid-uuid`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("Invalid UUID format");
  });
});
