const request = require("supertest");
const app = require("../src/server"); // Adjust the path based on your file structure
const mongoose = require("mongoose");
const User = require("../src/models/User");
const bcrypt = require("bcrypt");

describe("Authentication", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test User Registration
  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        username: "Tiffany",
        email: "tiffany@example.com",
        password: "dripcheck123",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered successfully.");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("email", "tiffany@example.com");
  });

  // Test User Login
  it("should login a user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "tiffany@example.com",
        password: "dripcheck123",
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Login successful!");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("email", "tiffany@example.com");
  });

  // Test Invalid Login
  it("should return error for invalid login credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "nonexistent@example.com",
        password: "wrongpassword",
      });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid password!");
  });

  // Test Protected Route
  it("should fetch user info for authenticated user", async () => {
    // First, log in to get a session token
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "tiffany@example.com",
        password: "dripcheck123",
      });

    const token = loginRes.body.token;

    // Use the token to access the protected route
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "User profile fetched successfully!");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("email", "tiffany@example.com");
  });

  beforeEach(async () => {
    await User.deleteMany({ username: "Tiffany" }); // Clean up test user
  });
});
