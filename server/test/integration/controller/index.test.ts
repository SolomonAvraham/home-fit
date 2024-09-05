import request from "supertest";
import { expect } from "chai";
import app from "../../../src/index";
import { describe, it } from "mocha";

describe("Main Index", () => {
  describe("GET /", () => {
    it('should return "Hello, world!"', async () => {
      const res = await request(app).get("/");
      expect(res.status).to.equal(200);
      expect(res.text).to.equal("Hello, world!");
    });
  });
});
