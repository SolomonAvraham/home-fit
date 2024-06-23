import request from "supertest";
import { expect } from "chai";
import app from "../../../src/index";
import {
  createTestEntities,
  testUserId,
  testWorkoutId,
} from "../../utils/generateTestEntities";
import generateToken from "../../utils/generateToken";
import { describe, it, before } from "mocha";

let token: string;

describe("Progress Controller", () => {
  before(async () => {
    await createTestEntities();
    token = generateToken({
      id: testUserId,
      email: "testuser@example.com",
      name: "Test User",
      password: "password123",
    });
  });

  it("should create progress", async () => {
    const res = await request(app)
      .post("/api/progress/createProgress")
      .set("Authorization", `Bearer ${token}`)
      .send({
        date: new Date(),
        userId: testUserId,
        workoutId: testWorkoutId,
        performanceMetrics: { metric: "value" },
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
  });

  it("should get all progress", async () => {
    const res = await request(app)
      .get("/api/progress/all")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("should update progress", async () => {
    const progress = await request(app)
      .post("/api/progress/createProgress")
      .set("Authorization", `Bearer ${token}`)
      .send({
        date: new Date(),
        userId: testUserId,
        workoutId: testWorkoutId,
        performanceMetrics: { metric: "value" },
      });

    const res = await request(app)
      .put(`/api/progress/updateProgress/${progress.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ performanceMetrics: { metric: "new value" } });

    expect(res.status).to.equal(200);
    expect(res.body.performanceMetrics.metric).to.equal("new value");
  });

  it("should delete progress", async () => {
    const progress = await request(app)
      .post("/api/progress/createProgress")
      .set("Authorization", `Bearer ${token}`)
      .send({
        date: new Date(),
        userId: testUserId,
        workoutId: testWorkoutId,
        performanceMetrics: { metric: "value" },
      });

    const res = await request(app)
      .delete(`/api/progress/deleteProgress/${progress.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(204);
  });
});
