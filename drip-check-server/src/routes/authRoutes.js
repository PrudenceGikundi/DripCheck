/*import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { body } from "express-validator";
import protect from "../middleware/authMiddleware.js"; 

const router = express.Router();

// Protected route (only accessible if the user is authenticated)
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Welcome to your profile!", user: req.user });
});

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Include a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  registerUser
);

router.post("/login", loginUser);

console.log("🚀 Auth routes file loaded!");

router.get("/test", (req, res) => {
  console.log("🚀 Test route hit!");
  res.json({ message: "Auth test route is working!" });
});

export default router;
*/

import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { body } from "express-validator";
import protect from "../middleware/authMiddleware.js";  // Correct import

const router = express.Router();

// Protected route (only accessible if the user is authenticated)
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Welcome to your profile!", user: req.user });
});

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Include a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  registerUser
);

router.post("/login", loginUser);

console.log("🚀 Auth routes file loaded!");

router.get("/test", (req, res) => {
  console.log("🚀 Test route hit!");
  res.json({ message: "Auth test route is working!" });
});

export default router;  // Exporting the router
