const request = require("supertest");
const app = require("../server");

describe("Malama Waikiki Resort API", () => {
  test("GET / should return API running message", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Malama Waikiki Resort API is running");
  });

  test("GET /api/dashboard should return Oahu dashboard data", async () => {
    const response = await request(app).get("/api/dashboard?island=Oahu");

    expect(response.statusCode).toBe(200);
    expect(response.body.city).toBe("Honolulu");
    expect(response.body.metrics).toHaveProperty("adr");
  });

  test("GET /admin/dashboard without login should be blocked", async () => {
    const response = await request(app).get("/admin/dashboard");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Unauthorized. Please log in first.");
  });
});