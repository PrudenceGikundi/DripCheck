const express = require("express");
const { analyzeOutfit } = require("../utils/aiHelper");

const router = express.Router();

router.post("/analyze", (req, res) => {
  const result = analyzeOutfit(req.body);
  res.status(200).json(result);
});

module.exports = router;