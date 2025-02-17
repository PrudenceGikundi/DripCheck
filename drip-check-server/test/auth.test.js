const request = require('supertest');
const app = require('../src/server');  // Adjust the path based on your file structure
const mongoose = require('mongoose');
const User = require('../src/models/User');
const bcrypt = require("bcrypt");

describe("Authentication", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
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
        password: "dripcheck123"
      });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');  // Check if token is in response
  });

  // Test User Login
  it("should login a user", async () => {
    // Ensure the user exists in the database before logging in
    await User.create({
      username: "Tiffany",
      email: "tiffany@example.com",
      password: "dripcheck123"
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "tiffany@example.com",
        password: "dripcheck123"
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  // Test Invalid Login
  it("should return error for invalid login credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "nonexistent@example.com",
        password: "wrongpassword"
      });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });
  beforeEach(async () => {
    await User.deleteMany({ username: "Tiffany" }); // Clean up test user
});

});
