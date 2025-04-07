import express from "express";
import verifyClerkSession from "../middleware/clerkMiddleware.js";
import Outfit from "../models/Outfit.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage for multer

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
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d", algorithm: "HS256" } // Explicitly specify the algorithm
        );

        res.json({ token, user: { id: user._id, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Get All Outfits
router.get("/", async (req, res) => {
    try {
        const outfits = await Outfit.find().populate("user", "username");
        res.json(outfits);
    } catch (err) {
        console.error("❌ Error fetching outfits:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Create a New Outfit
router.post("/", verifyClerkSession, upload.single("image"), async (req, res) => {
    try {
        const { description } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }

        if (!description) {
            return res.status(400).json({ error: "Description is required" });
        }

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "dripcheck/outfits" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(req.file.buffer);
        });

        const outfit = new Outfit({
            image: uploadResult.secure_url,
            description,
            user: req.user.id,
        });

        await outfit.save();
        res.status(201).json(outfit);
    } catch (err) {
        console.error("❌ Error creating outfit:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Get outfits for a specific user
router.get("/user", verifyClerkSession, async (req, res) => {
    try {
        const outfits = await Outfit.find({ user: req.user.id });
        res.json(outfits);
    } catch (err) {
        console.error("❌ Error fetching user outfits:", err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
