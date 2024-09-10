import express, { Request, Response, NextFunction } from "express";
import { expect } from "chai";
import request from "supertest";
import { validateUUID } from "../../../src/middleware/validateUUID"; // Adjust the path as necessary

const app = express();

app.get("/test/:id", validateUUID, (req: Request, res: Response) => {
  res.status(200).send("Valid UUID");
});

describe("validateUUID Middleware", () => {
  it("should return 200 if the UUID is valid", (done) => {
    request(app)
      .get("/test/550e8400-e29b-41d4-a716-446655440000")
      .expect(200)
      .expect("Valid UUID", done);
  });

  it("should return 400 if the UUID is invalid", (done) => {
    request(app)
      .get("/test/invalid-uuid")
      .expect(400)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body).to.have.property("message", "Invalid UUID format");
      })
      .end(done);
  });
});
