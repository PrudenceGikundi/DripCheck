const express = require("express");
const router = express.Router();
const Outfit = require("../models/Outfit");
const Rating = require("../models/Rating"); // Import Rating model
const authMiddleware = require("../middleware/authMiddleware");

// Fetch all outfits
router.get("/", async (req, res) => {
    try {
        const outfits = await Outfit.find().populate("user", "username");
        res.json(outfits);
    } catch (error) {
        res.status(500).json({ message: "Error fetching outfits", error });
    }
});

// Rate an outfit (POST)
router.post("/:id/rate", authMiddleware, async (req, res) => {
    try {
        const { rating } = req.body; // Get the rating from the request body

        // Ensure the rating is between 1 and 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const outfit = await Outfit.findById(req.params.id); // Find outfit by ID
        if (!outfit) return res.status(404).json({ message: "Outfit not found" });

        // Check if the user has already rated this outfit
        const existingRating = await Rating.findOne({ user: req.user.id, outfit: req.params.id });
        if (existingRating) return res.status(400).json({ message: "You have already rated this outfit" });

        // Create a new rating
        const newRating = new Rating({
            user: req.user.id,
            outfit: req.params.id,
            rating,
        });

        await newRating.save(); // Save the rating

        // Add rating to the outfit's ratings array
        outfit.ratings.push(newRating._id);
        
        // Recalculate the average rating
        const totalRatings = outfit.ratings.length;
        const sumRatings = await Rating.aggregate([
            { $match: { outfit: outfit._id } },
            { $group: { _id: "$outfit", totalRating: { $sum: "$rating" } } }
        ]);

        outfit.averageRating = sumRatings[0].totalRating / totalRatings; // Calculate average rating
        await outfit.save(); // Save the updated outfit

        res.status(201).json(outfit); // Return updated outfit with new rating
    } catch (error) {
        res.status(500).json({ message: "Error rating outfit", error });
    }
});

module.exports = router;
