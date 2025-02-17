const express = require("express");
const { createBattle, getBattles, likeOutfit } = require("../controllers/battleController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new battle (protected route)
router.post("/battle", protect, createBattle);

// Get all battles (public route)
router.get("/battles", getBattles);

// Like an outfit (protected route)
router.post("/like", protect, likeOutfit);

module.exports = router;
