import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan"; // For logging HTTP requests
import helmet from "helmet"; // For securing HTTP headers

dotenv.config();

console.log("CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY);
console.log("CLERK_JWT_KEY:", process.env.CLERK_JWT_KEY);

import authRoutes from "./routes/authRoutes.js";
import outfitRoutes from "./routes/outfitRoutes.js";
import marketplaceRoutes from "./routes/marketplaceRoutes.js";
import battleRoutes from "./routes/battleRoutes.js";

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
mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/prudenceHackathon", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/outfits", outfitRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/battle", battleRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error("❌ Global Error Handler:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
