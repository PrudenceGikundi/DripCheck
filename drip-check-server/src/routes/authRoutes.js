const express = require("express");
const clerkClient = require("../config/clerk");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const verifyClerkSession = require("../middleware/clerkMiddleware");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
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
        console.error("❌ Error during registration:", error);
        res.status(400).json({ error: error.message });
    }
});

// Login User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required!" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password!" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10d" });

        res.json({
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
            },
        });
    } catch (err) {
        console.error("❌ Error during login:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

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

module.exports = router;
