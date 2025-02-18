import mongoose from "mongoose";

const marketplaceItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    priceKsh: { type: Number, required: true },  // Price in KSH
    caption: { type: String },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Link to User Model (Seller)
}, { timestamps: true });

export default mongoose.model("MarketplaceItem", marketplaceItemSchema);
