import express from "express";
import { createItem, getItems } from "../controllers/marketplaceController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a marketplace item (protected route)
router.post("/item", protect, createItem);

// Get all marketplace items (public route)
router.get("/items", getItems);

export default router;
