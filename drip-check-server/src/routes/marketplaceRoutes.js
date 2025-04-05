const express = require("express");
const verifyClerkSession = require("../middleware/clerkMiddleware");
const MarketplaceItem = require("../models/MarketplaceItem");
const cloudinary = require("cloudinary").v2;

const router = express.Router();

// Create marketplace item
router.post("/item", verifyClerkSession, async (req, res) => {
    try {
        const { title, image, description, priceKsh, caption } = req.body;

        // Upload image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(image, {
            folder: "dripcheck/marketplace",
        });

        const item = await MarketplaceItem.create({
            title,
            image: uploadResult.secure_url,
            description,
            priceKsh,
            caption,
            seller: req.user.id,
        });

        res.status(201).json(item);
    } catch (err) {
        console.error("❌ Error creating marketplace item:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get all marketplace items
router.get("/items", async (req, res) => {
    try {
        const items = await MarketplaceItem.find().populate("seller", "username");
        res.json(items);
    } catch (err) {
        console.error("❌ Error fetching marketplace items:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get user marketplace items
router.get("/user", verifyClerkSession, async (req, res) => {
    try {
        const items = await MarketplaceItem.find({ seller: req.user.id });
        res.json(items);
    } catch (err) {
        console.error("❌ Error fetching user marketplace items:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Rate seller
router.post("/:id/rate-seller", verifyClerkSession, async (req, res) => {
    try {
        const { rating } = req.body;

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const item = await MarketplaceItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });

        const seller = await User.findById(item.seller);
        if (!seller) return res.status(404).json({ message: "Seller not found" });

        seller.ratings.push(rating);
        seller.averageRating = seller.ratings.reduce((sum, r) => sum + r, 0) / seller.ratings.length;

        await seller.save();

        res.status(201).json(seller);
    } catch (err) {
        console.error("❌ Error rating seller:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
