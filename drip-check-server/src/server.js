require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const morgan = require("morgan"); // For logging HTTP requests
const helmet = require("helmet"); // For securing HTTP headers

// Import routes
const authRoutes = require("./routes/authRoutes");
const outfitRoutes = require("./routes/outfitRoutes");
const marketplaceRoutes = require("./routes/marketplaceRoutes");
const battleRoutes = require("./routes/battleRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    credentials: true, // Allow cookies to be sent
}));
app.use(morgan("dev")); // Log HTTP requests
app.use(helmet()); // Secure HTTP headers

// Handle JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        console.error("❌ Invalid JSON payload:", err.message);
        return res.status(400).json({ error: "Invalid JSON payload" });
    }
    next();
});

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/outfits", outfitRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/battle", battleRoutes);
app.use("/api/ai", aiRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error("❌ Global Error Handler:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
