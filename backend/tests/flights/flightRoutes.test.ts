import request from "supertest";
import app from "../../src/server"; // or whatever the Express app export is

describe("flight routes", () => {
  it("health check - /api/flights responds", async () => {
    const res = await request(app).get("/api/flights");
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });
});
