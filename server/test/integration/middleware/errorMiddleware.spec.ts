import request from "supertest";
import { expect } from "chai";
import app from "../../../src/index";

describe("Error Middleware", () => {
  it("should handle errors correctly", async () => {
    const res = await request(app).get("/api/test/error");

    expect(res.status).to.equal(500);
    expect(res.body.error).to.equal("Test error");
  });
});
