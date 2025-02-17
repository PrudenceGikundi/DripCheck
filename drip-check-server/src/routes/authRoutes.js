const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { body } = require("express-validator");

const router = express.Router();
const protect = require("../middleware/authMiddleware");  // Correct import of the middleware

// Protected route (only accessible if the user is authenticated)
router.get("/profile", protect, (req, res) => {
    res.json({ message: "Welcome to your profile!", user: req.user });
});

router.post(
  "/register",
  [
    body("username", "Username is required").not().isEmpty(),
    body("email", "Include a valid email").isEmail(),
    body("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  registerUser
);

router.post("/login", loginUser);

console.log("🚀 Auth routes file loaded!");
router.get("/test", (req, res) => {
    console.log("🚀 Test route hit!");
    res.json({ message: "Auth test route is working!" });
});


module.exports = router;
