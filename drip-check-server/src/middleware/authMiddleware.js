// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");  // Attach user data to request
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = protect;
