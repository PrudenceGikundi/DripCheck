/*
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Generation of Json Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.json({ 
      _id: user._id, 
      username: user.username, 
      email: user.email, 
      role: user.role,  // 🔥 Send role to frontend
      token: generateToken(user._id) 
    });

  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
*/

import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to protect routes by verifying the JWT token
const protect = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1]; // Extract token from 'Authorization' header

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = await User.findById(decoded.id).select("-password"); // Get user by id and exclude password
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("❌ Token verification failed:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default protect; 
