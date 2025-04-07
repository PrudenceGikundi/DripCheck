import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { updateUserRole } from "../controllers/adminController.js";

const router = express.Router();

router.put("/update-role/:id", protect, adminOnly, updateUserRole);

export default router;
