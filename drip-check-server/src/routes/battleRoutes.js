const express = require("express");
const verifyClerkSession = require("../middleware/clerkMiddleware");
const { createBattle, getBattles, likeOutfit } = require("../controllers/battleController");

const router = express.Router();

// Create a new battle
router.post("/battle", verifyClerkSession, createBattle);

// Get all battles
router.get("/battles", getBattles);

// Like an outfit
router.post("/like", verifyClerkSession, likeOutfit);

// Get leaderboard
router.get("/leaderboard", async (req, res) => {
    try {
        const leaderboard = await Outfit.find()
            .sort({ averageRating: -1 })
            .limit(10)
            .populate("user", "username");

        res.json(leaderboard);
    } catch (err) {
        console.error("❌ Error fetching leaderboard:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
