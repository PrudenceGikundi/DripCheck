const express = require("express");
const router = express.Router();
const Outfit = require("../models/Outfit");
const Rating = require("../models/Rating"); // Import Rating model
const verifyClerkSession = require("../middleware/clerkMiddleware"); // Updated middleware import
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage for multer

// Fetch all outfits
router.get("/", async (req, res) => {
    try {
        const outfits = await Outfit.find().populate("user", "username");
        res.json(outfits);
    } catch (error) {
        res.status(500).json({ message: "Error fetching outfits", error });
    }
});

// Post an outfit
router.post("/", verifyClerkSession, upload.single("image"), async (req, res) => {
    try {
        const { description } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }

        if (!description) {
            return res.status(400).json({ error: "Description is required" });
        }

        // Upload image to Cloudinary
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
            user: req.user.id, // User ID from Clerk
        });

        await outfit.save();
        res.status(201).json(outfit);
    } catch (error) {
        console.error("❌ Error posting outfit:", error.message);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

// Rate an outfit (POST)
router.post("/:id/rate", verifyClerkSession, async (req, res) => {
    try {
        const { rating } = req.body;

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const outfit = await Outfit.findById(req.params.id);
        if (!outfit) return res.status(404).json({ message: "Outfit not found" });

        const newRating = new Rating({
            user: req.user.id,
            outfit: req.params.id,
            rating,
        });

        await newRating.save();

        const ratings = await Rating.find({ outfit: req.params.id });
        const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

        outfit.averageRating = averageRating;
        await outfit.save();

        res.status(201).json(outfit);
    } catch (error) {
        res.status(500).json({ message: "Error rating outfit", error });
    }
});

// Add a comment to an outfit (POST)
router.post("/:id/comment", verifyClerkSession, async (req, res) => {
    try {
        const { comment } = req.body;

        const outfit = await Outfit.findById(req.params.id);
        if (!outfit) return res.status(404).json({ message: "Outfit not found" });

        outfit.comments.push({ user: req.user.id, text: comment });
        await outfit.save();

        res.status(201).json(outfit);
    } catch (err) {
        console.error("❌ Error adding comment:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
