// test/integration/middleware/authMiddleware.spec.ts
import request from "supertest";
import { expect } from "chai";
import app from "../../../src/index";
import jwt from "jsonwebtoken";
import { describe, it } from "mocha";

describe("Auth Middleware", () => {
  it("should return 401 if no token is provided", async () => {
    const res = await request(app).get("/api/test/protected");
    expect(res.status).to.equal(401);
    expect(res.body.error).to.equal("No token provided");
  });

  it("should return 401 if an invalid token is provided", async () => {
    const res = await request(app)
      .get("/api/test/protected")
      .set("Authorization", "Bearer invalidtoken");

    expect(res.status).to.equal(401);
    expect(res.body.error).to.equal("Invalid token");
  });

  it("should return 200 if a valid token is provided", async () => {
    const token = jwt.sign(
      { id: "testuser", email: "test@example.com" },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1h" }
    );

    const res = await request(app)
      .get("/api/test/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Access granted");
  });
});
