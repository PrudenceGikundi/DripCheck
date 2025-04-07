import express from "express";
import { analyzeOutfit } from "../utils/aiHelper.js";

const router = express.Router();

router.post("/analyze", (req, res) => {
  const result = analyzeOutfit(req.body);
  res.status(200).json(result);
});

export default router;