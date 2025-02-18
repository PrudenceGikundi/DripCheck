
import mongoose from "mongoose";

const dripBattleSchema = new mongoose.Schema({
    outfit: { type: mongoose.Schema.Types.ObjectId, ref: "MarketplaceItem", required: true },
    likes: { type: Number, default: 0 }, // Track likes/stars
}, { timestamps: true });

export default mongoose.model("DripBattle", dripBattleSchema);
