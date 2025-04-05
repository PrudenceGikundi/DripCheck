const router = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ Email is already registered:", email);
      return res.status(400).json({ error: "Email is already registered!" });
    }

    // Hash password
    console.log("🔍 Plain text password:", password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("🔑 Hashed password:", hashedPassword);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to database
    const user = await newUser.save();
    console.log("✅ User registered:", user);

    res.status(201).json({ message: "User registered successfully!", user });
  } catch (err) {
    console.error("❌ Error registering user:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ error: "User not found!" });
    }

    console.log("🔍 Found user:", user);

    // Validate password
    console.log("🔍 Entered password:", password);
    console.log("🔑 Stored password (hashed):", user.password);
    const validPassword = await bcrypt.compare(password, user.password);
    console.log("🔍 Password match result:", validPassword);

    if (!validPassword) {
      console.log("❌ Incorrect password");
      return res.status(400).json({ error: "Incorrect password!" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    console.log("✅ Token generated:", token);

    res.json({ message: "Login successful!", token, user });
  } catch (err) {
    console.error("❌ Error logging in:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get User Info (Protected Route)
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log("👤 User info fetched:", user);
    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching user info:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = router;
