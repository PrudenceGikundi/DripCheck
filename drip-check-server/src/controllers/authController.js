import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

// Generate JWT Token
const generateToken = (id) => 
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

// @route   POST /api/auth/register
// @desc    Register new user
export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ 
      _id: user._id, 
      username: user.username, 
      email: user.email, 
      token: generateToken(user._id) 
    });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    console.log("🔍 Login request received:", req.body);
    
    res.json({ 
      _id: user._id, 
      username: user.username, 
      email: user.email, 
      token: generateToken(user._id) 
    });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
