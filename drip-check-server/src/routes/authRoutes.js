import express from "express";
import { body } from "express-validator";
import verifyClerkSession from "../middleware/clerkMiddleware.js";
import clerkClient from "../config/clerk.js";

const router = express.Router();

// Register User
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Include a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ error: "Email, password, and username are required." });
    }

    try {
      const user = await clerkClient.users.createUser({
        emailAddress: [email],
        password,
        username,
      });

      res.status(201).json({ message: "User registered successfully.", user });
    } catch (error) {
      console.error("❌ Error during registration:", error.message);
      res.status(400).json({ error: error.message });
    }
  }
);

// Login User
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Include a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required!" });
    }

    try {
      const user = await clerkClient.users.getUserList({
        emailAddress: email,
      });

      if (!user || user.length === 0) {
        return res.status(404).json({ error: "User not found!" });
      }

      const isPasswordValid = await clerkClient.users.verifyPassword(user[0].id, password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password!" });
      }

      res.json({
        message: "Login successful!",
        user: {
          id: user[0].id,
          email: user[0].emailAddresses[0].emailAddress,
          username: user[0].username,
        },
      });
    } catch (err) {
      console.error("❌ Error during login:", err.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Get User Info (Protected Route)
router.get("/me", verifyClerkSession, async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.user.id);
    res.json({
      message: "User profile fetched successfully!",
      user,
    });
  } catch (err) {
    console.error("❌ Error fetching user info:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Test Route
router.get("/test", (req, res) => {
  console.log("🚀 Test route hit!");
  res.json({ message: "Auth test route is working!" });
});

export default router;
