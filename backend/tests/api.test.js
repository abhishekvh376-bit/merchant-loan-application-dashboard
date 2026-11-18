const request = require("supertest");
const app = require("../src/app");

describe("Merchant Loan API", () => {
  let token;
  beforeAll(async () => {
    const response = await request(app).post("/api/auth/login")
      .send({ email: "admin@merchant.com", password: "Password123!" });
    token = response.body.token;
  });

  test("health endpoint responds", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  test("rejects invalid login", async () => {
    const response = await request(app).post("/api/auth/login")
      .send({ email: "wrong@example.com", password: "wrong" });
    expect(response.status).toBe(401);
  });

  test("protects applications endpoint", async () => {
    const response = await request(app).get("/api/applications");
    expect(response.status).toBe(401);
  });

  test("returns a paginated application list", async () => {
    const response = await request(app).get("/api/applications?page=1&limit=5")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(5);
    expect(response.body.pagination.total).toBe(18);
  });

  test("filters applications by status", async () => {
    const response = await request(app).get("/api/applications?status=Approved")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.data.every((item) => item.status === "Approved")).toBe(true);
  });

  test("returns a single application", async () => {
    const response = await request(app).get("/api/applications/LN-2026-1001")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.data.merchant).toBe("Aarav Retail Pvt Ltd");
  });
});
