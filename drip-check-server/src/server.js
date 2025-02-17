const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const outfitRoutes = require("./routes/outfits"); // Import outfit routes
const marketplaceRoutes = require("./routes/marketplaceRoutes");
const battleRoutes = require("./routes/battleRoutes");


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

console.log("Mongo URI:", process.env.MONGO_URI);

// Log Routes
console.log("✅ Auth Routes Loaded");
console.log("✅ Outfit Routes Loaded");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/outfits", outfitRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/battle", battleRoutes);


// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
