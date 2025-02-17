const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    outfit: { type: mongoose.Schema.Types.ObjectId, ref: "Outfit", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
}, { timestamps: true });

module.exports = mongoose.model("Rating", RatingSchema);
