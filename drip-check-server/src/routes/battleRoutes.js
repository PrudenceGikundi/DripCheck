import express from "express";
import { createBattle, getBattles, likeOutfit } from "../controllers/battleController.js";
import protect from "../middleware/authMiddleware.js"; 

const router = express.Router();

// Create a new battle (protected route)
router.post("/battle", protect, createBattle);

// Get all battles (public route)
router.get("/battles", getBattles);

// Like an outfit (protected route)
router.post("/like", protect, likeOutfit);

export default router;
