const mongoose = require("mongoose");

const dripBattleSchema = new mongoose.Schema({
    outfit: { type: mongoose.Schema.Types.ObjectId, ref: "MarketplaceItem", required: true },
    likes: { type: Number, default: 0 }, // Track likes/stars
}, { timestamps: true });

module.exports = mongoose.model("DripBattle", dripBattleSchema);
