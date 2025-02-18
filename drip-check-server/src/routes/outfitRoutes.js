import express from "express";
import Outfit from "../models/Outfit.js";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user._id, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Upload outfit
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { image, description } = req.body;
        const outfit = new Outfit({ user: req.user.id, image, description });
        await outfit.save();
        res.status(201).json(outfit);
    } catch (error) {
        res.status(500).json({ message: "Error uploading outfit", error });
    }
});

export default router;
