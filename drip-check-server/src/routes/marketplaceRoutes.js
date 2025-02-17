const express = require("express");
const { createItem, getItems } = require("../controllers/marketplaceController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create a marketplace item (protected route)
router.post("/item", protect, createItem);

// Get all marketplace items (public route)
router.get("/items", getItems);

module.exports = router;
