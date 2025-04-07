import express from "express";
import verifyClerkSession from "../middleware/clerkMiddleware.js";
import { createBattle, getBattles, likeOutfit } from "../controllers/battleController.js";

const router = express.Router();

router.post("/battle", verifyClerkSession, createBattle);
router.get("/battles", getBattles);
router.post("/like", verifyClerkSession, likeOutfit);

export default router;
